import dynamicValue from './dynamic-value';

const getTimeLeft = endTime => Math.max(endTime - Date.now(), 0) || null;

export default function(endTime, refreshInterval = 1000) {
  return dynamicValue({
    refreshInterval,
    params: [endTime],
    updateChecker: getTimeLeft,
  });
}
