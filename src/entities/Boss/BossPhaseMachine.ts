export type BossPhase = 1 | 2;

export class BossPhaseMachine {
  phase: BossPhase = 1;

  update(health: number, phaseTwoThreshold: number): BossPhase {
    if (this.phase === 1 && health <= phaseTwoThreshold) {
      this.phase = 2;
    }
    return this.phase;
  }
}
