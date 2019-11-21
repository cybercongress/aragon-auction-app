import dynamicValue from './dynamic-value';
import { useAragonApi } from '@aragon/api-react';
import { ROUND_DURATION } from '../common/constants';

const getRoundEndTime = (currentRound, startTime) => {
  if (currentRound === null || !startTime) {
    return null;
  }

  if (currentRound === 0) {
    return startTime;
  }

  return startTime.valueOf() + currentRound * ROUND_DURATION;
};

const getTimeLeft = endTime => Math.max(endTime - Date.now(), 0) || null;

export default function(currentRound, refreshInterval = 1000) {
  const { appState } = useAragonApi();
  const { startTime } = appState;
  const endTime = getRoundEndTime(currentRound, startTime);

  return dynamicValue({
    refreshInterval,
    params: [endTime],
    updateChecker: getTimeLeft,
  });
}
