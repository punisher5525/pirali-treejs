# Pirali Three.js Refactor

This folder is the new Three.js + TypeScript migration target for the original inline `index.html` game.

The original browser game is intentionally left untouched at the repository root. This project is the clean architecture layer where gameplay can be migrated gradually.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Architecture

- `src/app`: application shell, game loop, time, events.
- `src/scene`: Three.js scene, camera, lights.
- `src/config`: editable gameplay balance and level data.
- `src/world`: procedural world/path/church/environment generation.
- `src/entities`: reusable gameplay entities.
- `src/systems`: input, score, progression and future gameplay systems.
- `src/ui`: DOM UI layer that listens to game events.

## Migration Order

1. Keep the scaffold stable.
2. Migrate player movement, camera and input.
3. Migrate world/path generation.
4. Migrate combat: shooting, sword, dash, projectiles.
5. Migrate enemies and state machines.
6. Migrate pickups, score and UI.
7. Migrate boss and final victory flow.
8. Add leaderboard adapter and polish.

## Rules

- Keep gameplay state separate from Three.js visuals.
- Keep UI separate from rendering.
- Put tuning values in `src/config`.
- Add new mechanics as systems/entities, not as globals.
- Use events for cross-system communication.
