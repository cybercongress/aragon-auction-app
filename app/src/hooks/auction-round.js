import dynamicValue from './dynamic-value';

// TODO: No more than numberOfDays
const getRound = (startTime, openTime, roundDuration) => {
  const now = Date.now();

  if (!startTime) {
    return null;
  }

  if (now < startTime && now > openTime) {
    return 0;
  }

  if (now < startTime) {
    return null;
  }

  return Math.floor((now - startTime) / roundDuration) + 1;
};

export default function(
  startTime,
  openTime,
  roundDuration,
  refreshInterval = 1000
) {
  return dynamicValue({
    refreshInterval,
    params: [startTime, openTime, roundDuration],
    updateChecker: getRound,
  });
}
