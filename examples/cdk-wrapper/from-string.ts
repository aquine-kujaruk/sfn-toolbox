import { readFileSync } from 'fs';
import { StateMachine } from '../../packages/cdk-wrapper/lib';
import definitionSubstitutions from './definition-substitutions.json';

const definitionString = readFileSync(`${__dirname}/definitions/workflow.asl.json`, 'utf-8');

const stateMachine = StateMachine.fromString(definitionString, { definitionSubstitutions });

console.log(stateMachine.toJson());
