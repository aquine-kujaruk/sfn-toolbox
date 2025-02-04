import { App, Stack } from 'aws-cdk-lib';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import { Construct } from 'constructs';
import { readFileSync } from 'fs';
import { CloudFormationResource, StateMachineDefinition, StateMachineProps } from './types';
import { applyDefinitionSubstitutions } from './utils';

/**
 * Utility class for creating and manipulating AWS Step Functions state machine definitions.
 * Provides multiple ways to create state machine definitions from different input sources.
 */
export class StateMachine {
  /**
   * Creates a state machine definition from a chainable CDK construct.
   *
   * @param definitionCallback - Function that returns an IChainable CDK construct
   * @param props - Optional state machine properties including substitutions and comments
   * @returns A StateMachineDefinition object containing the parsed definition
   */
  public static fromChainable(
    definitionCallback: (scope: Construct) => sfn.IChainable,
    props?: StateMachineProps
  ) {
    return this.generateDefinition(definitionCallback, props);
  }

  /**
   * Creates a state machine definition from an ASL JSON string.
   *
   * @param definitionString - The state machine definition as an ASL JSON string
   * @param props - Optional state machine properties including substitutions and comments
   * @returns A StateMachineDefinition object containing the parsed definition
   */
  public static fromString(definitionString: string, props?: StateMachineProps) {
    const definitionBody = sfn.DefinitionBody.fromString(definitionString);
    return this.generateDefinition(definitionBody, props);
  }

  /**
   * Creates a state machine definition from an ASL JSON file.
   *
   * @param path - Path to the ASL JSON definition file
   * @param props - Optional state machine properties including substitutions and comments
   * @returns A StateMachineDefinition object containing the parsed definition
   */
  public static fromFile(path: string, props?: StateMachineProps) {
    const definitionString = readFileSync(path, 'utf-8');
    const definitionBody = sfn.DefinitionBody.fromString(definitionString);
    return this.generateDefinition(definitionBody, props);
  }

  /**
   * Creates a state machine definition from a JavaScript object.
   *
   * @param definitionObject - The state machine definition as a JavaScript object
   * @param props - Optional state machine properties including substitutions and comments
   * @returns A StateMachineDefinition object containing the parsed definition
   */
  public static fromObject(definitionObject: Record<string, any>, props?: StateMachineProps) {
    return this.fromString(JSON.stringify(definitionObject), props);
  }

  private static generateDefinition(
    definitionBody: sfn.DefinitionBody | ((scope: Construct) => sfn.IChainable),
    props?: StateMachineProps
  ) {
    const app = new App();
    const scope = new Stack(app, 'StateMachine');

    new sfn.StateMachine(scope, 'StateMachine', {
      comment: props?.comment,
      definitionBody:
        definitionBody instanceof sfn.DefinitionBody
          ? definitionBody
          : sfn.DefinitionBody.fromChainable(definitionBody(scope)),
    });

    const { template } = app.synth().getStackArtifact('StateMachine');

    return this.extractDefinitionFromTemplate(template, props);
  }

  private static extractDefinitionFromTemplate(
    template: Record<string, any>,
    props?: StateMachineProps
  ): StateMachineDefinition {
    const stateMachineResource = Object.values(template.Resources).find(
      (resource: any) => resource.Type === 'AWS::StepFunctions::StateMachine'
    ) as CloudFormationResource;

    const definitionString = stateMachineResource?.Properties?.DefinitionString ?? '{}';
    const definitionStringWithSubstitutions = applyDefinitionSubstitutions(
      definitionString,
      props?.definitionSubstitutions
    );

    return {
      toJson: () => JSON.parse(definitionStringWithSubstitutions),
      toString: () => definitionStringWithSubstitutions,
    };
  }
}
