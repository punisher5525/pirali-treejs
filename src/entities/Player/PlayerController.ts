import * as THREE from 'three';
import type { EventBus, GameEventMap } from '../../app/EventBus';
import type { Time } from '../../app/Time';
import { GAME_BALANCE } from '../../config/gameBalance';
import type { InputSystem } from '../../systems/InputSystem';
import { Entity } from '../Entity';
import { PlayerState } from './PlayerState';

export class PlayerController extends Entity {
  readonly state = new PlayerState();
  private readonly velocity = new THREE.Vector3();
  private readonly dashDirection = new THREE.Vector3(0, 0, -1);

  constructor(
    private readonly events: EventBus<GameEventMap>,
    private readonly input: InputSystem
  ) {
    super();
    this.object.name = 'Player';
    this.object.add(this.createVisual());
    this.emitState();
  }

  reset(position: THREE.Vector3): void {
    this.object.position.copy(position);
    this.state.health = this.state.maxHealth;
    this.state.ammo = this.state.maxAmmo;
    this.state.dashCooldown = 0;
    this.state.dashTime = 0;
    this.velocity.set(0, 0, 0);
    this.emitState();
  }

  update(time: Time): void {
    const move = this.input.command.move;
    const desired = new THREE.Vector3(move.x, 0, -move.y);

    if (desired.lengthSq() > 0.001) {
      desired.normalize();
      this.state.facing = Math.atan2(desired.x, desired.z);
      this.dashDirection.copy(desired);
    }

    if (this.input.consumeDash() && this.state.dashCooldown <= 0) {
      this.state.dashTime = GAME_BALANCE.player.dashDuration;
      this.state.dashCooldown = GAME_BALANCE.player.dashCooldown;
    }

    const speed = this.state.dashTime > 0 ? GAME_BALANCE.player.dashSpeed : GAME_BALANCE.player.moveSpeed;
    const direction = this.state.dashTime > 0 ? this.dashDirection : desired;
    this.velocity.copy(direction).multiplyScalar(speed * time.delta);
    this.object.position.add(this.velocity);

    this.state.dashTime = Math.max(0, this.state.dashTime - time.delta);
    this.state.dashCooldown = Math.max(0, this.state.dashCooldown - time.delta);
    this.object.rotation.y = this.state.facing;

    this.events.emit('player:dashChanged', {
      cooldownRatio: 1 - this.state.dashCooldown / GAME_BALANCE.player.dashCooldown
    });
  }

  private createVisual(): THREE.Group {
    const group = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.CapsuleGeometry(16, 34, 6, 12),
      new THREE.MeshStandardMaterial({ color: 0x3b2612, roughness: 0.65 })
    );
    const hat = new THREE.Mesh(
      new THREE.ConeGeometry(18, 22, 5),
      new THREE.MeshStandardMaterial({ color: 0x17120a, roughness: 0.75 })
    );
    const aim = new THREE.Mesh(
      new THREE.BoxGeometry(6, 6, 32),
      new THREE.MeshStandardMaterial({ color: 0xd0a24a, roughness: 0.5 })
    );

    body.position.y = 28;
    hat.position.y = 62;
    aim.position.set(0, 36, -24);
    body.castShadow = true;
    hat.castShadow = true;
    aim.castShadow = true;
    group.add(body, hat, aim);
    return group;
  }

  private emitState(): void {
    this.events.emit('player:healthChanged', { health: this.state.health, maxHealth: this.state.maxHealth });
    this.events.emit('player:ammoChanged', { ammo: this.state.ammo, maxAmmo: this.state.maxAmmo });
  }
}
