import { renderWithTheme, screen } from "@/test-utils";
import Hero from "../Hero";

describe("Hero", () => {
  it("renders the page heading", () => {
    renderWithTheme(<Hero />);
    expect(screen.getByRole("heading", { level: 1, name: "Fantasy Football" })).toBeInTheDocument();
  });
});
