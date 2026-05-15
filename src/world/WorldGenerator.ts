import * as THREE from 'three';
import { GAME_BALANCE } from '../config/gameBalance';
import type { LevelConfig } from '../config/levels';
import { PathGenerator } from './PathGenerator';

export class WorldGenerator {
  readonly startPosition = new THREE.Vector3(0, 18, GAME_BALANCE.world.height / 2 - 180);
  readonly churchPosition = new THREE.Vector3(0, 18, -GAME_BALANCE.world.height / 2 + 120);
  private readonly pathGenerator = new PathGenerator();
  private worldRoot = new THREE.Group();

  generate(scene: THREE.Scene, level: LevelConfig): void {
    scene.remove(this.worldRoot);
    this.worldRoot.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
      }
    });

    this.worldRoot = new THREE.Group();
    this.worldRoot.name = 'WorldRoot';
    this.worldRoot.add(this.createGround(level));
    this.worldRoot.add(this.createPath(level.id));
    this.worldRoot.add(this.createChurch());
    this.worldRoot.add(this.createEnvironment(level));
    scene.add(this.worldRoot);
  }

  private createGround(level: LevelConfig): THREE.Mesh {
    const geometry = new THREE.PlaneGeometry(GAME_BALANCE.world.width, GAME_BALANCE.world.height);
    const material = new THREE.MeshStandardMaterial({ color: level.groundColor, roughness: 0.95 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    return mesh;
  }

  private createPath(level: number): THREE.Group {
    const group = new THREE.Group();
    const points = this.pathGenerator.generate(level);
    const material = new THREE.MeshStandardMaterial({ color: 0x8a642d, roughness: 1 });

    for (let i = 0; i < points.length - 1; i += 1) {
      const a = points[i];
      const b = points[i + 1];
      const length = a.distanceTo(b);
      const geometry = new THREE.BoxGeometry(120, 2, length);
      const segment = new THREE.Mesh(geometry, material);
      segment.position.copy(a).lerp(b, 0.5);
      segment.rotation.y = Math.atan2(b.x - a.x, b.z - a.z);
      segment.receiveShadow = true;
      group.add(segment);
    }

    return group;
  }

  private createChurch(): THREE.Group {
    const group = new THREE.Group();
    group.position.copy(this.churchPosition);

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(130, 90, 120),
      new THREE.MeshStandardMaterial({ color: 0xc8b07a, roughness: 0.78 })
    );
    body.position.y = 45;
    body.castShadow = true;

    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(84, 70, 4),
      new THREE.MeshStandardMaterial({ color: 0x6e2f18, roughness: 0.72 })
    );
    roof.position.y = 125;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;

    group.add(body, roof);
    return group;
  }

  private createEnvironment(level: LevelConfig): THREE.Group {
    const group = new THREE.Group();
    const count = level.environment.includes('desert') ? 90 : 150;

    for (let i = 0; i < count; i += 1) {
      const x = (Math.random() - 0.5) * (GAME_BALANCE.world.width - 120);
      const z = (Math.random() - 0.5) * (GAME_BALANCE.world.height - 320);
      if (Math.abs(x) < 95) continue;

      const object = level.environment.includes('desert') ? this.createRock() : this.createTree();
      object.position.set(x, 0, z);
      group.add(object);
    }

    return group;
  }

  private createTree(): THREE.Group {
    const group = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(8, 11, 44, 7), new THREE.MeshStandardMaterial({ color: 0x5a3218 }));
    const crown = new THREE.Mesh(new THREE.ConeGeometry(34, 90, 8), new THREE.MeshStandardMaterial({ color: 0x1d4a24 }));
    trunk.position.y = 22;
    crown.position.y = 88;
    trunk.castShadow = true;
    crown.castShadow = true;
    group.add(trunk, crown);
    return group;
  }

  private createRock(): THREE.Mesh {
    const mesh = new THREE.Mesh(
      new THREE.DodecahedronGeometry(24 + Math.random() * 16, 0),
      new THREE.MeshStandardMaterial({ color: 0x5f5244, roughness: 1 })
    );
    mesh.position.y = 16;
    mesh.scale.y = 0.55;
    mesh.castShadow = true;
    return mesh;
  }
}
