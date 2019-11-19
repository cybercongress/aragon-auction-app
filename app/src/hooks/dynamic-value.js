import { useState, useEffect } from 'react';

export default function({
  params = [],
  refreshInterval = 1000,
  updateChecker,
}) {
  const [currentValue, setValue] = useState(null);

  useEffect(() => {
    const initialValue = updateChecker(...params);

    setValue(initialValue);

    if (initialValue !== null) {
      const intervalId = setInterval(() => {
        const updatedValue = updateChecker(...params);

        if (updatedValue === null) {
          clearInterval(intervalId);
        }

        setValue(updatedValue);
      }, refreshInterval);

      return () => clearInterval(intervalId);
    }
  }, params);

  return currentValue;
}
