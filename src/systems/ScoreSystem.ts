import type { EventBus, GameEventMap } from '../app/EventBus';

export class ScoreSystem {
  private score = 0;

  constructor(private readonly events: EventBus<GameEventMap>) {}

  reset(): void {
    this.score = 0;
    this.emit();
  }

  add(points: number): void {
    this.score += points;
    this.emit();
  }

  get value(): number {
    return this.score;
  }

  private emit(): void {
    this.events.emit('score:changed', { score: this.score });
  }
}
