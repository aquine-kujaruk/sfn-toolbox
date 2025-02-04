import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import { Construct } from 'constructs';

/**
 * Function type that takes a CDK Construct scope and returns a chainable Step Functions definition.
 */
export type ChainableCallback = (scope: Construct) => sfn.IChainable;

/**
 * Properties that can be passed when creating a state machine definition.
 * Includes a subset of AWS CDK StateMachineProps:
 * - definitionSubstitutions: Variables to substitute in the definition.
 * - comment: Description of the state machine
 */
export type StateMachineProps = Pick<sfn.StateMachineProps, 'definitionSubstitutions' | 'comment'>;

/**
 * Interface representing a parsed state machine definition with methods to:
 * - toJson(): Get the definition as a JavaScript object
 * - toString(): Get the definition as an ASL JSON string
 */
export type StateMachineDefinition = {
  toJson: () => Record<string, any>;
  toString: () => string;
};

/**
 * Type representing a CloudFormation resource with optional properties
 * containing a definition string.
 */
export type CloudFormationResource =
  | {
      Properties?: { DefinitionString?: string };
      Type?: string;
    }
  | undefined;
