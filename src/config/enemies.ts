export type EnemyType = 'rifle' | 'saber' | 'officer' | 'landlord';

export type EnemyConfig = {
  type: EnemyType;
  health: number;
  radius: number;
  speed: number;
  detectionRange: number;
  attackRange: number;
};

export const ENEMY_CONFIGS: Record<EnemyType, EnemyConfig> = {
  rifle: {
    type: 'rifle',
    health: 1,
    radius: 12,
    speed: 110,
    detectionRange: 340,
    attackRange: 380
  },
  saber: {
    type: 'saber',
    health: 1,
    radius: 12,
    speed: 135,
    detectionRange: 340,
    attackRange: 28
  },
  officer: {
    type: 'officer',
    health: 2,
    radius: 14,
    speed: 125,
    detectionRange: 360,
    attackRange: 450
  },
  landlord: {
    type: 'landlord',
    health: 1,
    radius: 13,
    speed: 95,
    detectionRange: 300,
    attackRange: 0
  }
};
