export class Time {
  delta = 0;
  elapsed = 0;
  frame = 0;

  update(deltaSeconds: number): void {
    this.delta = Math.min(deltaSeconds, 0.05);
    this.elapsed += this.delta;
    this.frame += 1;
  }
}
