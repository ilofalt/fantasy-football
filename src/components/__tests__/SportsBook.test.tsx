import { fireEvent, renderWithTheme, screen, waitFor } from "@/test-utils";
import { FAAB_BALANCES } from "@/content/faab";
import { currentMatchups } from "@/content/matchups";
import type { Bet } from "@/lib/bets/types";
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
  winner: null,
  createdAt: 1,
  ...over,
});

// Logged in as `manager`; /api/bets serves `bets`; bet actions are recorded.
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
      <SportsBook />
    </AuthProvider>
  );

describe("SportsBook", () => {
  it("asks logged-out visitors to log in", async () => {
    mockApi(null, []);
    renderBook();
    expect(await screen.findByText(/Log in with the button at the top/)).toBeInTheDocument();
  });

  it("shows the logged-in manager's FAAB, with open bets on top", async () => {
    mockApi("Andrew", [openBet()]);
    renderBook();
    // Shown as both the balance and what's available (nothing is on the line yet).
    expect(await screen.findAllByText(`$${FAAB_BALANCES.Andrew}`)).toHaveLength(2);
    expect(await screen.findByText(`Zachary bets 5 FAAB that ${home} beats ${away}`)).toBeInTheDocument();
    const headings = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(headings[0]).toBe("Open bets (1)");
    expect(headings[1]).toBe("Place a bet");
  });

  it("matches an open bet", async () => {
    const calls = mockApi("Andrew", [openBet()]);
    renderBook();
    fireEvent.click(await screen.findByRole("button", { name: "Match 5 FAAB" }));
    await waitFor(() => expect(calls).toContain("POST /api/bets/b1/match {}"));
  });

  it("won't let you match more than you have available", async () => {
    mockApi("Daniel", [openBet({ amount: 50 })]); // Daniel has $0
    renderBook();
    expect(await screen.findByRole("button", { name: "Not enough FAAB" })).toBeDisabled();
  });

  it("lets the commissioner match a bet or void it", async () => {
    mockApi("Isaiah", [openBet({ amount: 50 })]); // Isaiah has $0, so Match is disabled but Void works
    renderBook();
    expect(await screen.findByRole("button", { name: "Not enough FAAB" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Void" })).toBeEnabled();
  });

  it("lets you withdraw your own bet instead of matching it", async () => {
    mockApi("Zachary", [openBet()]);
    renderBook();
    expect(await screen.findByRole("button", { name: "Withdraw" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^Match/ })).not.toBeInTheDocument();
  });

  it("places a bet capped at the available FAAB", async () => {
    const calls = mockApi("Andrew", []);
    renderBook();
    await screen.findAllByText(`$${FAAB_BALANCES.Andrew}`);

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
