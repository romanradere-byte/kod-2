type ReactionType = "like" | "dislike";

type Stats = {
  like: number;
  dislike: number;
};

const STATS_KEY = "book_stats";
const REACTIONS_KEY = "my_reactions";



function getAllStats(): Record<number, Stats> {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(STATS_KEY);
  return raw ? JSON.parse(raw) : {};
}

function saveAllStats(stats: Record<number, Stats>) {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

function getMyReactions(): Record<number, ReactionType> {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(REACTIONS_KEY);
  return raw ? JSON.parse(raw) : {};
}

function saveMyReactions(r: Record<number, ReactionType>) {
  localStorage.setItem(REACTIONS_KEY, JSON.stringify(r));
}

// ========== PUBLIC API ==========

export function getStats(bookId: number) {
  const all = getAllStats();
  const s = all[bookId] || { like: 0, dislike: 0 };

  return {
    like: s.like,
    dislike: s.dislike,
    rating: s.like - s.dislike,
  };
}

export function getAllRatings(): Record<number, number> {
  const all = getAllStats();
  const result: Record<number, number> = {};

  for (const id in all) {
    result[Number(id)] = all[id].like - all[id].dislike;
  }

  return result;
}

export function getReaction(bookId: number): ReactionType | null {
  const mine = getMyReactions();
  return mine[bookId] || null;
}

export function toggleReaction(bookId: number, type: ReactionType) {
  const allStats = getAllStats();
  const my = getMyReactions();

  const current = my[bookId];

  if (!allStats[bookId]) {
    allStats[bookId] = { like: 0, dislike: 0 };
  }

  // If clicking same reaction → remove it
  if (current === type) {
    allStats[bookId][type]--;
    delete my[bookId];
  } else {
    // remove previous
    if (current) {
      allStats[bookId][current]--;
    }

    // add new
    allStats[bookId][type]++;
    my[bookId] = type;
  }

  saveAllStats(allStats);
  saveMyReactions(my);
}
