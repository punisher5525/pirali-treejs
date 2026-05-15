import type { Time } from '../../app/Time';
import { Entity } from '../Entity';
import { BossPhaseMachine } from './BossPhaseMachine';

export class BossController extends Entity {
  readonly phases = new BossPhaseMachine();

  update(_time: Time): void {
    // Boss attacks migrate here after projectile and enemy systems are in place.
  }
}
