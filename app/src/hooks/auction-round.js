import dynamicValue from './dynamic-value';

const getRound = (startTime, openTime, numberOfRounds, roundDuration) => {
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

  return Math.min(
    numberOfRounds,
    Math.floor((now - startTime) / roundDuration) + 1
  );
};

export default function(
  startTime,
  openTime,
  numberOfRounds,
  roundDuration,
  refreshInterval = 1000
) {
  return dynamicValue({
    refreshInterval,
    params: [startTime, openTime, numberOfRounds, roundDuration],
    updateChecker: getRound,
  });
}
