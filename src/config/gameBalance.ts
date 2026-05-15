export const GAME_BALANCE = {
  world: {
    width: 2000,
    height: 3800
  },
  player: {
    health: 5,
    ammo: 8,
    moveSpeed: 180,
    dashSpeed: 680,
    dashDuration: 0.18,
    dashCooldown: 2.75
  },
  camera: {
    height: 720,
    followEase: 7.5
  },
  score: {
    enemyKill: 100,
    streak3: 200,
    streak5: 300,
    parry: 50,
    medal: 250,
    bossKill: 1000
  }
} as const;
