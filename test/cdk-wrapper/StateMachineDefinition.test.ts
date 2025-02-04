import { readFileSync } from 'fs';
import path from 'path';
import definitionSubstitutions from '../../examples/cdk-wrapper/definition-substitutions.json';
import { Workflow } from '../../examples/cdk-wrapper/definitions/workflow';
import definition from '../../examples/cdk-wrapper/definitions/workflow.asl.json';
import { StateMachine, applyDefinitionSubstitutions } from '../../packages/cdk-wrapper/lib';

const aslFilePath = path.join(
  __dirname,
  '../../examples/cdk-wrapper/definitions/workflow.asl.json'
);

describe('StateMachine', () => {
  let expectedDefinition: any;

  beforeEach(() => {
    const definitionString = readFileSync(aslFilePath, 'utf-8');
    const definitionStringWithSubstitutions = applyDefinitionSubstitutions(
      definitionString,
      definitionSubstitutions
    );
    expectedDefinition = JSON.parse(definitionStringWithSubstitutions);
  });

  it('Should correctly load definition from ASL JSON file', () => {
    const fromFileDefinition = StateMachine.fromFile(aslFilePath, { definitionSubstitutions });

    expect(fromFileDefinition.toJson()).toEqual(expectedDefinition);
  });

  it('Should correctly parse definition from JSON object', () => {
    const fromObjectDefinition = StateMachine.fromObject(definition, { definitionSubstitutions });

    expect(fromObjectDefinition.toJson()).toEqual(expectedDefinition);
  });

  it('Should correctly parse definition from JSON string', () => {
    const definitionString = readFileSync(aslFilePath, 'utf-8');
    const fromStringDefinition = StateMachine.fromString(definitionString, {
      definitionSubstitutions,
    });
    expect(fromStringDefinition.toJson()).toEqual(expectedDefinition);
  });

  it('Should correctly convert cdk chainable definition to ASL format', () => {
    const fromChainableDefinition = StateMachine.fromChainable(Workflow, {
      definitionSubstitutions,
    });

    expect(fromChainableDefinition.toJson()).toEqual(expectedDefinition);
  });
});
