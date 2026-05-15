export class Random {
  constructor(private seed = Date.now()) {}

  next(): number {
    this.seed = (this.seed * 1664525 + 1013904223) >>> 0;
    return this.seed / 0xffffffff;
  }

  range(min: number, max: number): number {
    return min + (max - min) * this.next();
  }
}
