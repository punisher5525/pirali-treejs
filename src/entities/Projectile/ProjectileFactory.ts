import * as THREE from 'three';
import { ObjectPool } from '../../core/pooling/ObjectPool';
import { Projectile } from './Projectile';

export class ProjectileFactory {
  private readonly pool = new ObjectPool(
    () => new Projectile(),
    (projectile) => {
      projectile.active = false;
      projectile.life = 0;
      projectile.velocity.set(0, 0, 0);
    }
  );

  create(position: THREE.Vector3, velocity: THREE.Vector3, life: number, friendly: boolean): Projectile {
    const projectile = this.pool.acquire();
    projectile.object.position.copy(position);
    projectile.velocity.copy(velocity);
    projectile.life = life;
    projectile.friendly = friendly;
    projectile.active = true;
    return projectile;
  }
}
