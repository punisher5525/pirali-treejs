import { Time } from './Time';

export type TickHandler = (time: Time) => void;

export class GameLoop {
  readonly time = new Time();
  private running = false;
  private lastTimestamp = 0;
  private animationId = 0;

  constructor(private readonly onTick: TickHandler) {}

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTimestamp = performance.now();
    this.animationId = requestAnimationFrame(this.tick);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.animationId);
  }

  private readonly tick = (timestamp: number): void => {
    if (!this.running) return;

    const deltaSeconds = (timestamp - this.lastTimestamp) / 1000;
    this.lastTimestamp = timestamp;
    this.time.update(deltaSeconds);
    this.onTick(this.time);
    this.animationId = requestAnimationFrame(this.tick);
  };
}
