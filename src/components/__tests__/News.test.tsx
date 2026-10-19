import { renderWithTheme, screen, within } from "@/test-utils";
import News, { formatDate } from "../News";
import { news } from "@/content/news";

describe("News", () => {
  it("renders every article with its category and title", () => {
    renderWithTheme(<News />);
    const articles = screen.getAllByRole("article");
    expect(articles).toHaveLength(news.length);
    news.forEach((article, i) => {
      expect(within(articles[i]).getByRole("heading", { level: 3, name: article.title })).toBeInTheDocument();
      expect(within(articles[i]).getByText(article.category)).toBeInTheDocument();
    });
  });

  it("renders list items when an article has them", () => {
    renderWithTheme(<News />);
    const withList = news.find((a) => a.list && a.list.length > 0)!;
    expect(screen.getByText(withList.list![0].label)).toBeInTheDocument();
  });

  it("formats ISO dates as calendar dates without shifting the day", () => {
    expect(formatDate("2026-10-18")).toBe("Oct 18, 2026");
  });
});
