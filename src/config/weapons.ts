export const WEAPONS = {
  pistol: {
    cooldown: 0.36,
    projectileSpeed: 620,
    projectileLife: 1.8,
    ammoCost: 1
  },
  sword: {
    cooldown: 0.5,
    comboCooldown: 0.36,
    comboWindow: 0.5,
    range: 72,
    comboRange: 88,
    arc: 1.4,
    comboArc: 1.7,
    parryWindow: 0.19
  }
} as const;
