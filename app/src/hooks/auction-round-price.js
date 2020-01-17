import { useAragonApi } from '@aragon/api-react';
import { toBN } from 'web3-utils';

export function getCurrentPrice(
  currentRound,
  createFirstRound = 0,
  createPerRound = 0,
  raisedInRound = 0
) {
  if (currentRound === null) {
    return null;
  }

  if (raisedInRound == '0') {
    return '0';
  }

  const total = currentRound === 0 ? createFirstRound : createPerRound;
  return toBN(raisedInRound)
    .div(toBN(total))
    .toString(10);
}

export default function(currentRound) {
  const { appState } = useAragonApi();
  const { createFirstRound, createPerRound, totalRaisedByRound } = appState;

  return getCurrentPrice(
    currentRound,
    createFirstRound,
    createPerRound,
    totalRaisedByRound[currentRound]
  );
}
