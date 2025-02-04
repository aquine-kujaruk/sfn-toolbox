import { State } from 'aws-cdk-lib/aws-stepfunctions';

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
