export class DamageSystem {
  applyDamage(currentHealth: number, amount: number): number {
    return Math.max(0, currentHealth - amount);
  }
}
