import type { Time } from '../../app/Time';
import { Entity } from '../Entity';
import { EnemyStateMachine } from './EnemyStateMachine';

export class EnemyController extends Entity {
  readonly stateMachine = new EnemyStateMachine();

  update(_time: Time): void {
    // Enemy behavior migrates here after the scaffold is stable.
  }
}
