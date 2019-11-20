import React from 'react';
import { useAragonApi } from '@aragon/api-react';

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
  const currentRound = useAuctionRound(
    startTime,
    openTime,
    numberOfRounds,
    ROUND_DURATION
  );
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
