import React from 'react';
import { useAragonApi } from '@aragon/api-react';
import { toBN } from 'web3-utils';

import AuctionDetails from '../../components/AuctionDetails';
import useAuctionRoundTimer from '../../hooks/auction-round-timer';
import useAuctionRoundPrice from '../../hooks/auction-round-price';

const getCap = currentPrice => {
  if (!currentPrice) {
    return null;
  }

  const thc = 700 * Math.pow(10, 3);

  return toBN(thc)
    .mul(toBN(currentPrice))
    .toString(10);
};

function AuctionInformation({ currentRound, ...props }) {
  const { appState } = useAragonApi();
  const { numberOfRounds, totalRaised } = appState;
  const timeLeft = useAuctionRoundTimer(currentRound);
  const currentPrice = useAuctionRoundPrice(currentRound);
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

export default AuctionInformation;
