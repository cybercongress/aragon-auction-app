import React from 'react';
import { Text } from '@aragon/ui';

const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = ONE_MINUTE * 60;

const formatNumber = num => num.toString().padStart(2, '0');

const formatTime = time => {
  if (!time) {
    return '00 H : 00 M';
  }

  const hours = Math.floor(time / ONE_HOUR);
  const minutes = Math.ceil((time - hours * ONE_HOUR) / ONE_MINUTE);

  if (minutes === 60) {
    return `${formatNumber(hours + 1)} H : 00 M`;
  }

  return `${formatNumber(hours)} H : ${formatNumber(minutes)} M`;
};

function Timer({ timeLeft, ...props }) {
  return <Text {...props}>{formatTime(timeLeft)}</Text>;
}

export default Timer;
