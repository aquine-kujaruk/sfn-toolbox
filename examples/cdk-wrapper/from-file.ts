import { StateMachine } from '../../packages/cdk-wrapper/lib';
import definitionSubstitutions from './definition-substitutions.json';

const path = `${__dirname}/definitions/workflow.asl.json`;
const stateMachine = StateMachine.fromFile(path, { definitionSubstitutions });

console.log(stateMachine.toJson());
