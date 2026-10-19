import { renderWithTheme, screen } from "@/test-utils";
import Header from "../Header";

describe("Header", () => {
  it("links home and back to the main site", () => {
    renderWithTheme(<Header />);
    expect(screen.getByRole("link", { name: "Fantasy Football" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "isaiahofalt.com" })).toHaveAttribute(
      "href",
      "https://isaiahofalt.com"
    );
  });

  it("renders the color mode toggle", () => {
    renderWithTheme(<Header />);
    expect(screen.getByLabelText("Toggle color mode")).toBeInTheDocument();
  });
});
