import { fromWei } from 'web3-utils';

const MILLISECONDS_IN_SECOND = 1000;

export function roundCurrency(value, decimalDigits = 0) {
  return value
    .toFixed(decimalDigits)
    .replace(/(\.\d*?)0+$/, '$1')
    .replace(/\.$/, '');
}

export function formatCurrency(value, decimalDigits = 0) {
  return roundCurrency(
    parseFloat(fromWei(value.toString(), 'ether')),
    decimalDigits
  );
}

export function convertDate(date) {
  return new Date(parseInt(date, 10) * MILLISECONDS_IN_SECOND);
}

export const isEmpty = value => value === null || value === undefined;

export function safeToString(value) {
  if (value !== null && value !== undefined && value.toString) {
    return value.toString();
  }

  return value;
}
