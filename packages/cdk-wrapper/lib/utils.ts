import { State } from 'aws-cdk-lib/aws-stepfunctions';

/**
 * Extends a CDK State object by overriding its toStateJson method to include additional properties.
 * This is useful for adding properties that are not yet supported by the CDK constructs.
 *
 * @param state - The CDK State object to extend
 * @param props - Additional properties to merge with the base state JSON
 */
export const overrideStateJson = (state: State, props: Record<string, any>): void => {
  const originalToStateJson = state.toStateJson;

  state.toStateJson = function () {
    const baseStateJson = originalToStateJson.call(this);

    return {
      ...baseStateJson,
      ...props,
    };
  };
};

/**
 * Applies variable substitutions to a state machine definition string.
 * Replaces all occurrences of ${key} with their corresponding values from the substitutions object.
 *
 * @param definitionString - The state machine definition string containing variables
 * @param definitionSubstitutions - Object containing key-value pairs for substitution
 * @returns The definition string with all variables replaced with their values
 */
export const applyDefinitionSubstitutions = (
  definitionString: string,
  definitionSubstitutions?: Record<string, any>
) => {
  if (!definitionSubstitutions) return definitionString;

  for (const key in definitionSubstitutions) {
    definitionString = definitionString.replaceAll(
      new RegExp(`\\$\\{${key}\\}`, 'g'),
      definitionSubstitutions[key]
    );
  }

  return definitionString;
};
