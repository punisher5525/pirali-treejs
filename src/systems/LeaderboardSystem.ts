export type LeaderboardEntry = {
  name: string;
  score: number;
  level: number;
  win: boolean;
  timestamp: number;
};

export interface LeaderboardAdapter {
  submit(entry: LeaderboardEntry): Promise<void>;
  list(): Promise<LeaderboardEntry[]>;
}

export class LocalLeaderboardAdapter implements LeaderboardAdapter {
  private readonly key = 'pirali_threejs_lb_v1';

  async submit(entry: LeaderboardEntry): Promise<void> {
    const rows = await this.list();
    rows.push(entry);
    rows.sort((a, b) => b.score - a.score);
    localStorage.setItem(this.key, JSON.stringify(rows.slice(0, 100)));
  }

  async list(): Promise<LeaderboardEntry[]> {
    try {
      const rows = JSON.parse(localStorage.getItem(this.key) ?? '[]') as LeaderboardEntry[];
      return Array.isArray(rows) ? rows : [];
    } catch {
      return [];
    }
  }
}
