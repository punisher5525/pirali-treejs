import type { EnemyState } from './EnemyStateMachine';

export type EnemyAIDecision = {
  nextState: EnemyState;
};

export class EnemyAI {
  decide(currentState: EnemyState): EnemyAIDecision {
    return { nextState: currentState };
  }
}
