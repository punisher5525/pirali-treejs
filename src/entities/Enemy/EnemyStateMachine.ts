export type EnemyState = 'patrol' | 'alert' | 'attack' | 'retreat';

export class EnemyStateMachine {
  state: EnemyState = 'patrol';
  alertTimer = 0;
  retreatTimer = 0;

  transition(next: EnemyState): void {
    if (this.state === next) return;
    this.state = next;
  }
}
