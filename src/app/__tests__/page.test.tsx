import { renderWithTheme } from "@/test-utils";
import Home from "../page";

beforeEach(() => {
  global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;
});

describe("Home page composition", () => {
  it("renders header, hero, section tabs, matchups, and footer", () => {
    const { container } = renderWithTheme(<Home />);

    expect(container.querySelector("header")).not.toBeNull();
    expect(container.querySelector("main #home")).not.toBeNull();
    expect(container.querySelector("main [role=tablist]")).not.toBeNull();
    expect(container.querySelector("main #matchups")).not.toBeNull();
    expect(container.querySelector("footer")).not.toBeNull();
  });
});
