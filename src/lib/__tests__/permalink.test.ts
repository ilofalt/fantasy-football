import { parseHash, permalinkHash } from "../permalink";

describe("parseHash", () => {
  it("reads a tab on its own", () => {
    expect(parseHash("#news")).toEqual({ tab: "news", anchor: null });
  });

  it("reads a tab and an item", () => {
    expect(parseHash("#news/week-7-preview")).toEqual({ tab: "news", anchor: "week-7-preview" });
  });

  it("handles an empty hash", () => {
    expect(parseHash("")).toEqual({ tab: null, anchor: null });
    expect(parseHash("#")).toEqual({ tab: null, anchor: null });
  });

  it("round-trips with permalinkHash", () => {
    expect(parseHash(permalinkHash("trades", "ray-lanny-oct-14"))).toEqual({ tab: "trades", anchor: "ray-lanny-oct-14" });
  });
});
