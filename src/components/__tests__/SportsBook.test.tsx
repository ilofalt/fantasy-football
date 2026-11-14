import { fireEvent, renderWithTheme, screen, waitFor, within } from "@/test-utils";
import { FAAB_BALANCES, PLAY_MONEY_FAAB } from "@/content/faab";
import { currentMatchups } from "@/content/matchups";
import type { Bet } from "@/lib/bets/types";
import AccountMenu from "../AccountMenu";
import AuthProvider from "../AuthProvider";
import SportsBook from "../SportsBook";

const [home, away] = currentMatchups.matchups[0].teams.map((t) => t.manager);
const { week } = currentMatchups;

const openBet = (over: Partial<Bet> = {}): Bet => ({
  id: "b1",
  week,
  matchupId: currentMatchups.matchups[0].id,
  teams: [home, away],
  pick: home,
  amount: 5,
  bettor: "Zachary",
  taker: null,
  status: "open",
  offeredBy: over.bettor ?? "Zachary",
  winner: null,
  createdAt: 1,
  ...over,
});

// Logged in as `manager`; /api/bets serves `bets`; every request is recorded.
function mockApi(manager: string | null, bets: Bet[]) {
  const calls: string[] = [];
  global.fetch = jest.fn(async (url: RequestInfo | URL, init?: RequestInit) => {
    const path = String(url);
    calls.push(`${init?.method ?? "GET"} ${path}${init?.body ? ` ${init.body}` : ""}`);
    const json = (body: unknown) => ({ ok: true, json: async () => body }) as Response;
    if (path === "/api/auth/me") return json({ user: manager && { email: `${manager}@x.co`, manager } });
    return json({ bets });
  }) as jest.Mock;
  return calls;
}

const renderBook = () =>
  renderWithTheme(
    <AuthProvider>
      <AccountMenu />
      <SportsBook />
    </AuthProvider>
  );

// The value under a label in the manager's own FAAB card (the table below repeats these amounts).
const stat = async (label: string) => (await screen.findByText(label)).nextElementSibling?.textContent;

const countered = (over: Partial<Bet> = {}) =>
  openBet({ status: "countered", bettor: "Nicholas", taker: "Andrew", offeredBy: "Andrew", amount: 20, ...over });

beforeEach(() => {
  window.location.hash = "";
  Element.prototype.scrollIntoView = jest.fn();
});

describe("SportsBook", () => {
  describe("logged out", () => {
    it("asks visitors to log in", async () => {
      mockApi(null, []);
      renderBook();
      expect(await screen.findByText(/Log in with the button at the top/)).toBeInTheDocument();
    });

    it("prompts someone who followed a shared bet link to log in, and opens the dialog", async () => {
      window.location.hash = "#sportsbook/bet-b1";
      mockApi(null, [openBet()]);
      renderBook();
      const alert = await screen.findByRole("alert");
      expect(alert).toHaveTextContent("Someone shared a bet with you. Log in to see it");
      expect(screen.queryByText(/bets 5 FAAB/)).not.toBeInTheDocument(); // the bet itself stays hidden
      fireEvent.click(within(alert).getByRole("button", { name: "Log in" }));
      expect(await screen.findByRole("dialog")).toBeInTheDocument();
    });
  });

  describe("FAAB", () => {
    it("shows the logged-in manager's FAAB, with open bets on top", async () => {
      mockApi("Andrew", [openBet()]);
      renderBook();
      // Shown as both the balance and what's available (nothing is on the line yet).
      expect(await stat("FAAB")).toBe(`$${FAAB_BALANCES.Andrew}`);
      expect(await stat("Available to bet")).toBe(`$${FAAB_BALANCES.Andrew}`);
      expect(await screen.findByText(`Zachary bets 5 FAAB that ${home} beats ${away}`)).toBeInTheDocument();
      const headings = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
      expect(headings[0]).toBe("Open bets (1)");
      expect(headings[1]).toBe("Place a bet");
      expect(screen.queryByText(/You don.t actually have any FAAB/)).not.toBeInTheDocument();
    });

    it.each(["Isaiah", "Nicholas", "Daniel"])("gives %s play money, with a note, since they have none", async (name) => {
      expect(FAAB_BALANCES[name]).toBe(0);
      mockApi(name, []);
      renderBook();
      expect(await stat("FAAB")).toBe(`$${PLAY_MONEY_FAAB}`);
      expect(await stat("Available to bet")).toBe(`$${PLAY_MONEY_FAAB}`);
      expect(screen.getByText("You don’t actually have any FAAB, but here’s some cause this is just a test.")).toBeInTheDocument();
    });
  });

  describe("FAAB table", () => {
    it("lists every manager's FAAB at the bottom of the tab, biggest first", async () => {
      mockApi("Andrew", []);
      renderBook();
      const placeBet = await screen.findByRole("heading", { name: "Place a bet" });
      const heading = screen.getByRole("heading", { name: "Who can bet what" });
      expect(placeBet.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

      const rows = screen.getAllByTestId("faab-row");
      expect(rows).toHaveLength(Object.keys(FAAB_BALANCES).length);
      // The "can bet" column, which counts play money, runs from most to least.
      const canBet = rows.map((r) => Number(/\$(\d+)/.exec(r.textContent ?? "")?.[1]));
      expect(canBet).toEqual([...canBet].sort((a, b) => b - a));
      expect(rows[0]).toHaveTextContent(`$${PLAY_MONEY_FAAB}*`);
      const andrew = rows.find((r) => r.textContent?.includes("Andrew"))!;
      expect(andrew).toHaveTextContent(`$${FAAB_BALANCES.Andrew}`);
    });

    it("shows managers with none as play money, with their real balance beside it", async () => {
      mockApi(null, []);
      renderBook();
      const daniel = (await screen.findAllByTestId("faab-row")).find((r) => r.textContent?.includes("Daniel"))!;
      expect(daniel).toHaveTextContent(`$${PLAY_MONEY_FAAB}*`);
      expect(daniel).toHaveTextContent("$0 (play money)");
      expect(screen.getByText(/In reality they have zero/)).toBeInTheDocument();
    });

    it("is there for logged-out visitors too", async () => {
      mockApi(null, []);
      renderBook();
      expect(await screen.findByRole("heading", { name: "Who can bet what" })).toBeInTheDocument();
    });
  });

  describe("accepting", () => {
    it("accepts an open bet", async () => {
      const calls = mockApi("Andrew", [openBet()]);
      renderBook();
      fireEvent.click(await screen.findByRole("button", { name: "Accept bet" }));
      await waitFor(() => expect(calls).toContain('POST /api/bets/b1/accept {"seen":5}'));
    });

    it("won't let you accept more than you have available", async () => {
      mockApi("Daniel", [openBet({ amount: PLAY_MONEY_FAAB + 50 })]);
      renderBook();
      expect(await screen.findByRole("button", { name: "Accept bet" })).toBeDisabled();
      expect(screen.getByText(/You need 150 FAAB available to accept this/)).toBeInTheDocument();
    });

    it("lets you withdraw your own bet instead of accepting it", async () => {
      mockApi("Zachary", [openBet()]);
      renderBook();
      expect(await screen.findByRole("button", { name: "Withdraw" })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "Accept bet" })).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "Counter" })).not.toBeInTheDocument();
    });

    it("lets the commissioner void a bet as well as accept it", async () => {
      mockApi("Isaiah", [openBet()]);
      renderBook();
      expect(await screen.findByRole("button", { name: "Accept bet" })).toBeEnabled();
      expect(screen.getByRole("button", { name: "Void" })).toBeEnabled();
    });
  });

  describe("countering", () => {
    it("counters with a different amount, higher or lower", async () => {
      const calls = mockApi("Andrew", [openBet({ amount: 20 })]);
      renderBook();
      fireEvent.click(await screen.findByRole("button", { name: "Counter" }));
      const input = screen.getByLabelText("Your counter (FAAB)");
      const send = screen.getByRole("button", { name: "Send counter" });

      expect(send).toBeDisabled();
      fireEvent.change(input, { target: { value: "20" } }); // same amount
      expect(send).toBeDisabled();
      expect(screen.getByText(/Accept the bet instead/)).toBeInTheDocument();
      fireEvent.change(input, { target: { value: String(FAAB_BALANCES.Andrew + 1) } }); // more than he has
      expect(send).toBeDisabled();

      fireEvent.change(input, { target: { value: "8" } }); // lower
      expect(send).toBeEnabled();
      fireEvent.click(send);
      await waitFor(() => expect(calls).toContain('POST /api/bets/b1/counter {"amount":8,"seen":20}'));
    });

    it("lets the bettor answer a counter: accept, counter back, or walk away", async () => {
      const calls = mockApi("Nicholas", [countered()]);
      renderBook();
      expect(await screen.findByText(/Andrew is asking 20 FAAB\. Your move\./)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Counter" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Walk away" })).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "Accept bet" }));
      await waitFor(() => expect(calls).toContain('POST /api/bets/b1/accept {"seen":20}'));
    });

    it("makes the manager who countered wait for an answer", async () => {
      mockApi("Andrew", [countered()]);
      renderBook();
      expect(await screen.findByText(/Waiting on Nicholas\./)).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "Accept bet" })).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "Counter" })).not.toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Walk away" })).toBeInTheDocument();
    });

    it("shuts a third manager out of a countered bet", async () => {
      mockApi("Zachary", [countered()]);
      renderBook();
      expect(await screen.findByText(/Locked between Nicholas and Andrew\./)).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "Accept bet" })).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "Counter" })).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "Walk away" })).not.toBeInTheDocument();
    });
  });

  describe("sharing a bet", () => {
    it("gives every bet a link that points straight at it", async () => {
      mockApi("Andrew", [openBet()]);
      renderBook();
      const link = await screen.findByRole("link", { name: "Copy link to this bet" });
      expect(link).toHaveAttribute("href", "#sportsbook/bet-b1");
    });

    it("takes a logged-in manager straight to the shared bet", async () => {
      window.location.hash = "#sportsbook/bet-b2";
      mockApi("Andrew", [openBet(), openBet({ id: "b2", bettor: "Chris", amount: 9 })]);
      renderBook();
      await screen.findByText(`Chris bets 9 FAAB that ${home} beats ${away}`);
      const el = document.getElementById("bet-b2")!;
      expect(el).toBeInTheDocument();
      await waitFor(() => expect(Element.prototype.scrollIntoView).toHaveBeenCalled());
      expect(document.getElementById("bet-b1")).not.toBe(el);
    });

    it("says so when the shared bet doesn't exist or was withdrawn", async () => {
      window.location.hash = "#sportsbook/bet-nope";
      mockApi("Andrew", [openBet()]);
      const { unmount } = renderBook();
      expect(await screen.findByText(/That bet isn.t here/)).toBeInTheDocument();
      unmount();

      window.location.hash = "#sportsbook/bet-b1";
      mockApi("Andrew", [openBet({ status: "cancelled" })]);
      renderBook();
      expect(await screen.findByText("That bet was withdrawn.")).toBeInTheDocument();
    });
  });

  describe("placing and settling", () => {
    it("places a bet capped at the available FAAB", async () => {
      const calls = mockApi("Andrew", []);
      renderBook();
      await stat("Available to bet");

      fireEvent.click(screen.getByRole("button", { name: `${home} wins` }));
      const amount = screen.getByLabelText("FAAB to bet");
      fireEvent.change(amount, { target: { value: String(FAAB_BALANCES.Andrew + 1) } });
      expect(screen.getByRole("button", { name: /^Bet / })).toBeDisabled();

      fireEvent.change(amount, { target: { value: "10" } });
      fireEvent.click(screen.getByRole("button", { name: `Bet 10 FAAB on ${home}` }));
      await waitFor(() => expect(calls.some((c) => c.startsWith("POST /api/bets {") && c.includes('"amount":10'))).toBe(true));
    });

    it("only shows settle buttons to the commissioner", async () => {
      const matched = openBet({ status: "matched", taker: "Andrew" });
      mockApi("Andrew", [matched]);
      const { unmount } = renderBook();
      await screen.findByText(`Zachary has ${home}, Andrew has ${away}`);
      expect(screen.queryByRole("button", { name: `${home} won` })).not.toBeInTheDocument();
      unmount();

      mockApi("Isaiah", [matched]);
      renderBook();
      expect(await screen.findByRole("button", { name: `${home} won` })).toBeInTheDocument();
    });
  });
});
