import type { Time } from '../app/Time';
import type { Entity } from './Entity';

export class EntityManager {
  private readonly entities = new Set<Entity>();

  add(entity: Entity): void {
    this.entities.add(entity);
  }

  remove(entity: Entity): void {
    this.entities.delete(entity);
  }

  update(time: Time): void {
    this.entities.forEach((entity) => {
      if (entity.active) entity.update(time);
    });
  }
}
