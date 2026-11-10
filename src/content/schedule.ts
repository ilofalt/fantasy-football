// Remaining regular-season schedule, by manager. Week 10 counts as unplayed
// until every game is final, so the playoff odds never use a partial week.
export const REMAINING_SCHEDULE: { week: number; games: [string, string][] }[] = [
  { week: 10, games: [["Isaiah", "Nicholas"], ["Andrew", "lanny"], ["Noah", "Jonathan"], ["Daniel", "Ethan"], ["Chris", "Matthew"], ["Raymond", "Zachary"]] },
  { week: 11, games: [["Isaiah", "Zachary"], ["Nicholas", "Ethan"], ["Andrew", "Daniel"], ["Noah", "lanny"], ["Chris", "Raymond"], ["Jonathan", "Matthew"]] },
  { week: 12, games: [["Isaiah", "Chris"], ["Nicholas", "Andrew"], ["Noah", "Daniel"], ["lanny", "Jonathan"], ["Ethan", "Zachary"], ["Raymond", "Matthew"]] },
  { week: 13, games: [["Isaiah", "Raymond"], ["Nicholas", "Noah"], ["Andrew", "Zachary"], ["lanny", "Matthew"], ["Daniel", "Jonathan"], ["Ethan", "Chris"]] },
  { week: 14, games: [["Isaiah", "Matthew"], ["Nicholas", "Jonathan"], ["Andrew", "Chris"], ["Noah", "Zachary"], ["lanny", "Daniel"], ["Ethan", "Raymond"]] },
];
