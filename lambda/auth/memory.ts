import type { Bet } from "../../src/lib/bets/types";
import type { AuthStore, Session, User } from "./core";

export interface MemoryData {
  users: Record<string, User>;
  sessions: Record<string, Session>;
  bets: Record<string, Bet>;
}

/**
 * An in-memory AuthStore for tests and the local dev server (which passes its
 * saved data in and persists it from `onChange`).
 */
export function createMemoryStore(
  data: MemoryData = { users: {}, sessions: {}, bets: {} },
  onChange: (data: MemoryData) => void = () => {}
): AuthStore {
  data.bets ??= {};
  const changed = () => onChange(data);
  return {
    async createUser(user) {
      if (data.users[user.email]) return "email-taken";
      if (Object.values(data.users).some((u) => u.manager === user.manager)) return "manager-taken";
      data.users[user.email] = user;
      changed();
      return "ok";
    },
    async getUser(email) {
      return data.users[email] ?? null;
    },
    async putSession(hash, session) {
      data.sessions[hash] = session;
      changed();
    },
    async getSession(hash) {
      return data.sessions[hash] ?? null;
    },
    async deleteSession(hash) {
      delete data.sessions[hash];
      changed();
    },
    async listBets() {
      return Object.values(data.bets).map((b) => ({ ...b }));
    },
    async getBet(id) {
      return data.bets[id] ? { ...data.bets[id] } : null;
    },
    async createBet(bet) {
      data.bets[bet.id] = { ...bet };
      changed();
    },
    async updateBet(id, from, patch, expectAmount) {
      const bet = data.bets[id];
      if (!bet || bet.status !== from) return false;
      if (expectAmount !== undefined && bet.amount !== expectAmount) return false;
      Object.assign(bet, patch);
      changed();
      return true;
    },
  };
}
