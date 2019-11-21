import dynamicValue from './dynamic-value';
import { useAragonApi } from '@aragon/api-react';

import { ROUND_DURATION } from '../common/constants';

const getRound = (startTime, openTime, numberOfRounds, roundDuration) => {
  const now = Date.now();

  if (!startTime) {
    return null;
  }

  if (now < startTime && now > openTime) {
    return 0;
  }

  if (now < startTime) {
    return null;
  }

  return Math.min(
    numberOfRounds,
    Math.floor((now - startTime) / roundDuration) + 1
  );
};

export default function(
  roundDuration = ROUND_DURATION,
  refreshInterval = 1000
) {
  const { appState } = useAragonApi();
  const { numberOfRounds, startTime, openTime } = appState;

  return dynamicValue({
    refreshInterval,
    params: [startTime, openTime, numberOfRounds, roundDuration],
    updateChecker: getRound,
  });
}
