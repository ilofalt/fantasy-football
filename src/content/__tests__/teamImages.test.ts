import { existsSync } from "node:fs";
import path from "node:path";
import { teamImage, teamImages } from "../teamImages";

describe("teamImages", () => {
  it("prefers a manager's photo over the Yahoo logo", () => {
    expect(teamImage("Chris", "https://yahoo/logo.png")).toBe("/teams/chris.jpg");
  });

  it("falls back to the Yahoo logo, then to nothing", () => {
    expect(teamImage("Nobody", "https://yahoo/logo.png")).toBe("https://yahoo/logo.png");
    expect(teamImage("Nobody", null)).toBeNull();
    expect(teamImage(null)).toBeNull();
  });

  it.each(Object.entries(teamImages))("%s's photo exists in public/", (_m, src) => {
    expect(existsSync(path.join(process.cwd(), "public", src))).toBe(true);
  });
});
