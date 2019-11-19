import React from 'react';
import { useAragonApi } from '@aragon/api-react';

import AuctionDetails from '../../components/AuctionDetails';
import useAuctionRound from '../../hooks/auction-round';
import useTimer from '../../hooks/timer';

const ROUND_DURATION = 1000 * 60 * 60; // TODO: Replace with one day in production

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
  const thc = 700 * Math.pow(10, 3);

  return thc * currentPrice;
};

function ClaimTable(props) {
  const { appState } = useAragonApi();
  const {
    numberOfRounds,
    startTime,
    openTime,
    raised,
    currentPrice,
  } = appState;
  const currentRound = useAuctionRound(startTime, openTime, ROUND_DURATION);
  const timeLeft = useTimer(getRoundEndTime(currentRound, startTime));
  const cap = getCap(currentPrice);

  return (
    <AuctionDetails
      numberOfRounds={numberOfRounds}
      currentRound={currentRound}
      raised={raised}
      currentPrice={currentPrice}
      timeLeft={timeLeft}
      cap={cap}
      {...props}
    />
  );
}

export default ClaimTable;
