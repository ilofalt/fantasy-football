import { fireEvent, renderWithTheme, screen, waitFor, waitForElementToBeRemoved, within } from "@/test-utils";
import AuthProvider from "../AuthProvider";
import AccountMenu from "../AccountMenu";
import RecapProvider, { RecapLink } from "../WeeklyRecap";
import { RECAP_WEEK, recapStories } from "@/content/recaps";
import { MANAGERS_BY_TEAM } from "@/content/managers";
import { fetchMe } from "@/lib/auth/client";

jest.mock("../../lib/auth/client", () => ({
  fetchMe: jest.fn(),
  logIn: jest.fn(),
  signUp: jest.fn(),
  logOut: jest.fn(),
}));

const mockFetchMe = fetchMe as jest.MockedFunction<typeof fetchMe>;

function renderSite() {
  return renderWithTheme(
    <AuthProvider>
      <RecapProvider>
        <AccountMenu />
        <RecapLink week={RECAP_WEEK} />
      </RecapProvider>
    </AuthProvider>
  );
}

beforeEach(() => {
  localStorage.clear();
  mockFetchMe.mockReset();
});

describe("WeeklyRecap", () => {
  it("has a storyline and mistakes for every manager", () => {
    for (const manager of Object.values(MANAGERS_BY_TEAM)) {
      expect(recapStories[manager]?.headline).toBeTruthy();
      expect(recapStories[manager].mistakes.length).toBeGreaterThan(0);
    }
  });

  it("pops up the logged-in manager's recap, and stays closed after it's X'd out", async () => {
    mockFetchMe.mockResolvedValue({ user: { email: "i@example.com", manager: "Isaiah" } });
    const { unmount } = renderSite();

    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByText(recapStories.Isaiah.headline)).toBeInTheDocument();
    expect(within(dialog).getByText("Film room: what went wrong")).toBeInTheDocument();
    expect(within(dialog).getByText(recapStories.Isaiah.mistakes[0].text)).toBeInTheDocument();
    expect(within(dialog).getByText(`Week ${RECAP_WEEK} recap · for Isaiah`)).toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole("button", { name: "Close recap" }));
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
    unmount();

    // Next visit: no pop-up, but the header button brings it back.
    renderSite();
    const reopen = await screen.findByRole("button", { name: "Recap" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(reopen);
    expect(within(await screen.findByRole("dialog")).getByText(recapStories.Isaiah.headline)).toBeInTheDocument();
  });

  it("lets a logged-out visitor open any manager's recap from the news link", async () => {
    mockFetchMe.mockResolvedValue({ user: null });
    renderSite();
    await waitFor(() => expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument());
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Personalized Week \d+ recaps/ }));
    const dialog = await screen.findByRole("dialog");
    fireEvent.click(within(dialog).getByRole("button", { name: /Daniel/ }));
    expect(within(dialog).getByText(recapStories.Daniel.headline)).toBeInTheDocument();
  });
});
