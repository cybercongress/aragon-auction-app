import React from 'react';
import { Text } from '@aragon/ui';

function formatDate(round, currentRound) {
  if (round === currentRound) {
    return 'now';
  }

  if (currentRound > round) {
    return `${currentRound - round} day(s) ago`;
  }

  return `in ${round - currentRound} day(s)`;
}

function AuctionClosing({ round, currentRound, ...props }) {
  return <Text {...props}>{formatDate(round, currentRound)}</Text>;
}

export default AuctionClosing;
