import React from 'react';
import { useAragonApi } from '@aragon/api-react';

import { fromWei } from 'web3-utils';
import { toBN } from 'web3-utils';

import AuctionDetails from '../../components/AuctionDetails';
import useAuctionRoundTimer from '../../hooks/auction-round-timer';
import useAuctionRoundPrice from '../../hooks/auction-round-price';

const getCap = currentPrice => {
  if (!currentPrice) {
    return null;
  }

  const thc = Math.pow(10, 15);
  const capWei = toBN(thc).mul(toBN(currentPrice));
  return fromWei(toBN(capWei).toString(), 'ether');

};

function AuctionInformation({ currentRound, ...props }) {
  const { appState } = useAragonApi();
  const { numberOfRounds, totalRaised } = appState;
  const timeLeft = useAuctionRoundTimer(currentRound);
  const currentPrice = Math.round(useAuctionRoundPrice(currentRound));
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
