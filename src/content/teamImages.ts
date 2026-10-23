// Photos for each manager, shown wherever their team appears (Matchups,
// Weekly Report). Files live in public/teams/ as 256x256 squares. Managers
// without a photo here fall back to their Yahoo team logo.
export const teamImages: Record<string, string> = {
  Andrew: "/teams/andrew.jpg",
  Chris: "/teams/chris.jpg",
  Ethan: "/teams/ethan.jpg",
  Isaiah: "/teams/isaiah.jpg",
  Matthew: "/teams/matthew.jpg",
  Raymond: "/teams/raymond.jpg",
  Zachary: "/teams/zachary.jpg",
};

export function teamImage(manager: string | null | undefined, yahooLogo?: string | null): string | null {
  return (manager && teamImages[manager]) || yahooLogo || null;
}
