import React from 'react';
import { useAragonApi } from '@aragon/api-react';
import { toBN } from 'web3-utils';

import AuctionDetails from '../../components/AuctionDetails';
import useAuctionRound from '../../hooks/auction-round';
import useTimer from '../../hooks/timer';
import { ROUND_DURATION } from '../../common/constants';

const getRoundEndTime = (currentRound, startTime) => {
  if (currentRound === null) {
    return null;
  }

  if (currentRound === 0) {
    return startTime;
  }

  return startTime.valueOf() + currentRound * ROUND_DURATION;
};

const getCap = currentPrice => {
  if (!currentPrice) {
    return null;
  }

  const thc = 700 * Math.pow(10, 3);

  return toBN(thc)
    .mul(toBN(currentPrice))
    .toString(10);
};

function getCurrentPrice(
  currentRound,
  createFirstRound = 0,
  createPerRound = 0,
  raisedInRound = 0
) {
  if (!currentRound) {
    return null;
  }

  const total = currentRound === 0 ? createFirstRound : createPerRound;

  return toBN(raisedInRound)
    .div(toBN(total))
    .toString(10);
}

function ClaimTable(props) {
  const { appState } = useAragonApi();
  const {
    numberOfRounds,
    startTime,
    openTime,
    totalRaised,
    createFirstRound,
    createPerRound,
    totalRaisedByRound,
  } = appState;
  const currentRound = useAuctionRound(
    startTime,
    openTime,
    numberOfRounds,
    ROUND_DURATION
  );
  const timeLeft = useTimer(getRoundEndTime(currentRound, startTime));
  const currentPrice = getCurrentPrice(
    currentRound,
    createFirstRound,
    createPerRound,
    totalRaisedByRound[currentRound]
  );
  const cap = getCap(currentPrice);

  return (
    <AuctionDetails
      numberOfRounds={numberOfRounds}
      currentRound={currentRound}
      totalRaised={totalRaised}
      currentPrice={currentPrice}
      timeLeft={timeLeft}
      cap={cap}
      {...props}
    />
  );
}

export default ClaimTable;
