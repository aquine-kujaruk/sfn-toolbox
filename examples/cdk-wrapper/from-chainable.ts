import { StateMachine } from '../../packages/cdk-wrapper/lib';
import definitionSubstitutions from './definition-substitutions.json';
import { Workflow } from './definitions/workflow';

const stateMachine = StateMachine.fromChainable(Workflow, { definitionSubstitutions });

console.log(JSON.stringify(stateMachine.toJson(), null, 2));
