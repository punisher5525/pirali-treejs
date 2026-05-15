export type LevelEnvironment = 'forest-clear' | 'forest-mist' | 'desert-hot' | 'desert-dusk' | 'night-boss';

export type LevelConfig = {
  id: number;
  title: string;
  environment: LevelEnvironment;
  fogColor: number;
  groundColor: number;
  skyColor: number;
  lightColor: number;
  enemyDensity: number;
};

export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    title: 'პირველი ტური - ტყის გზა',
    environment: 'forest-clear',
    fogColor: 0x9fb9a8,
    groundColor: 0x263c1f,
    skyColor: 0x8fb8d5,
    lightColor: 0xfff0c0,
    enemyDensity: 0.85
  },
  {
    id: 2,
    title: 'მეორე ტური - შუა ამაღლება',
    environment: 'forest-mist',
    fogColor: 0x95aaa0,
    groundColor: 0x223524,
    skyColor: 0x8ea4a8,
    lightColor: 0xdde6d2,
    enemyDensity: 1.05
  },
  {
    id: 3,
    title: 'მესამე ტური - უდაბნოს ასახვევი',
    environment: 'desert-hot',
    fogColor: 0xd79542,
    groundColor: 0x8a5a24,
    skyColor: 0xe8a14d,
    lightColor: 0xffd07a,
    enemyDensity: 1.15
  },
  {
    id: 4,
    title: 'მეოთხე ტური - უდაბნოს მონასტერი',
    environment: 'desert-dusk',
    fogColor: 0x7a2b14,
    groundColor: 0x4e2b16,
    skyColor: 0x5c2314,
    lightColor: 0xf0a15c,
    enemyDensity: 1.25
  },
  {
    id: 5,
    title: 'მეხუთე ტური - გზა სამოთხემდე',
    environment: 'night-boss',
    fogColor: 0x080c18,
    groundColor: 0x111827,
    skyColor: 0x050814,
    lightColor: 0x9db7ff,
    enemyDensity: 1.4
  }
];
