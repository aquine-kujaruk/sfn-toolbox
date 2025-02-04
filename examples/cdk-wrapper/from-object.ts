import { StateMachine } from '../../packages/cdk-wrapper/lib';
import definitionSubstitutions from './definition-substitutions.json';
import definition from './definitions/workflow.asl.json';

const stateMachine = StateMachine.fromObject(definition, { definitionSubstitutions });

console.log(stateMachine.toJson());
