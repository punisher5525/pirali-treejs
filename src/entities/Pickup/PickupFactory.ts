import type { PickupType } from '../../config/pickups';
import { PICKUPS } from '../../config/pickups';
import { Pickup } from './Pickup';

export class PickupFactory {
  create(type: PickupType): Pickup {
    return new Pickup(type, PICKUPS[type].color);
  }
}
