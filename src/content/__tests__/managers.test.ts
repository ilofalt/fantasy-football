import { managerForTeamKey, MANAGERS_BY_TEAM } from "../managers";

describe("managerForTeamKey", () => {
  it("maps a Yahoo team key to the manager's real name", () => {
    expect(managerForTeamKey("461.l.55635.t.8")).toBe("Chris");
    expect(managerForTeamKey("461.l.55635.t.12")).toBe("Matthew");
  });

  it("returns null for an unknown key", () => {
    expect(managerForTeamKey("461.l.55635.t.99")).toBeNull();
    expect(managerForTeamKey("not-a-key")).toBeNull();
  });

  it("covers all 12 teams", () => {
    expect(Object.keys(MANAGERS_BY_TEAM)).toHaveLength(12);
  });
});
