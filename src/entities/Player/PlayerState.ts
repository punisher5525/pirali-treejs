import { GAME_BALANCE } from '../../config/gameBalance';

export class PlayerState {
  health = GAME_BALANCE.player.health;
  maxHealth = GAME_BALANCE.player.health;
  ammo = GAME_BALANCE.player.ammo;
  maxAmmo = GAME_BALANCE.player.ammo;
  facing = 0;
  dashCooldown = 0;
  dashTime = 0;
}
