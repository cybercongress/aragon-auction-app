import React from 'react';
import { Text } from '@aragon/ui';

const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = ONE_MINUTE * 60;

const formatTime = time => {
  const hours = Math.floor(time / ONE_HOUR);
  const minutes = Math.ceil((time - hours * ONE_HOUR) / ONE_MINUTE);

  if (minutes === 60) {
    return `${hours + 1} H : 0 M`;
  }

  return `${hours} H : ${minutes} M`;
};

function Timer({ timeLeft, ...props }) {
  if (!timeLeft) {
    return null;
  }

  return <Text {...props}>{formatTime(timeLeft)}</Text>;
}

export default Timer;
