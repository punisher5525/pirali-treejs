export type PickupType = 'ammo' | 'health' | 'herb' | 'medal';

export const PICKUPS: Record<PickupType, { label: string; color: number }> = {
  ammo: { label: 'Ammo', color: 0xd09820 },
  health: { label: 'Health', color: 0xe84040 },
  herb: { label: 'Herb', color: 0x44cc44 },
  medal: { label: 'Medal', color: 0xf0c020 }
};
