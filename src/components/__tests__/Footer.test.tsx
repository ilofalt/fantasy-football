import { renderWithTheme, screen } from "@/test-utils";
import Footer from "../Footer";

describe("Footer", () => {
  it("renders the current year and name", () => {
    renderWithTheme(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(`${year}.*Isaiah Ofalt`))).toBeInTheDocument();
  });
});
