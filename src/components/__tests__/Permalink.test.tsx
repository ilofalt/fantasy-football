import { act, fireEvent, renderWithTheme, screen } from "@/test-utils";
import Permalink from "../Permalink";

describe("Permalink", () => {
  beforeEach(() => window.history.replaceState(null, "", "/"));

  it("points at the tab and item", () => {
    renderWithTheme(<Permalink tab="news" anchor="week-7-preview" label="Week 7 preview" />);
    expect(screen.getByRole("link", { name: "Copy link to Week 7 preview" })).toHaveAttribute("href", "#news/week-7-preview");
  });

  it("updates the address bar and copies the full URL", async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    renderWithTheme(<Permalink tab="news" anchor="week-7-preview" label="Week 7 preview" />);
    await act(async () => {
      fireEvent.click(screen.getByRole("link", { name: "Copy link to Week 7 preview" }));
    });
    expect(window.location.hash).toBe("#news/week-7-preview");
    expect(writeText).toHaveBeenCalledWith("http://localhost/#news/week-7-preview");
  });
});
