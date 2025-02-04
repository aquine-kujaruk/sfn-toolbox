import { Duration } from 'aws-cdk-lib';
import { CustomState, Fail, Succeed } from 'aws-cdk-lib/aws-stepfunctions';
import { Construct } from 'constructs';
import { overrideStateJson } from '../../../packages/cdk-wrapper/lib';

export const Workflow = (scope: Construct) => {
  const handleFlightError = new Fail(scope, 'Handle Flight Error', {
    error: 'Flight Validation Error',
    cause: 'Error validating flight information',
  });

  const flightSuccessfullyValidated = new Succeed(scope, 'Flight Successfully Validated');

  const validateFlight = new CustomState(scope, 'Validate Flight', {
    stateJson: {
      Type: 'Task',
      Resource: 'arn:aws:lambda:${region}:${account}:function:validateFlight-${stage}',
      Parameters: {
        'flightNumber.$': '$.flightNumber',
        'deliveryGate.$': '$.deliveryGate',
      },
    },
  })
    .addCatch(handleFlightError, {
      errors: ['States.ALL'],
      resultPath: '$.error',
    })
    .addRetry({
      errors: ['States.ALL'],
      interval: Duration.seconds(2),
      maxAttempts: 2,
      backoffRate: 3.5,
    });

  overrideStateJson(validateFlight, {
    Assign: { 'validatedFlightDetails.$': '$' },
  });

  return validateFlight.next(flightSuccessfullyValidated);
};
