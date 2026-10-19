import { renderWithTheme, screen, fireEvent, waitFor } from "@/test-utils";
import ColorModeToggle from "../ColorModeToggle";

describe("ColorModeToggle", () => {
  it("renders a toggle button once mounted", async () => {
    renderWithTheme(<ColorModeToggle />);
    await waitFor(() => {
      expect(screen.getByLabelText("Toggle color mode")).toBeVisible();
    });
  });

  it("switches the icon when clicked", async () => {
    renderWithTheme(<ColorModeToggle />);
    const button = await screen.findByLabelText("Toggle color mode");
    await waitFor(() => expect(button).toBeVisible());

    const iconBefore = button.querySelector("svg")?.getAttribute("data-testid");
    fireEvent.click(button);

    await waitFor(() => {
      const iconAfter = button.querySelector("svg")?.getAttribute("data-testid");
      expect(iconAfter).not.toBe(iconBefore);
    });
  });
});
