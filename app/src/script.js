import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Aragon, { events } from '@aragon/api';
import { addressesEqual, convertDate } from './lib/web3-utils';

const app = new Aragon();

app.store(async (state, { event, returnValues, blockNumber, address }) => {
  // Initial state
  if (state == null) {
    return {
      openTime: 0,
      startTime: 0,
      numberOfRounds: 0,
      createFirstRound: 0,
      createPerRound: 0,
      foundation: '',
    };
  }

  switch (event) {
    case events.ACCOUNTS_TRIGGER:
      return updateConnectedAccount(state, returnValues);
    case events.SYNC_STATUS_SYNCING:
      return { ...state, isSyncing: true };
    case events.SYNC_STATUS_SYNCED:
      return { ...state, isSyncing: false };
    case 'LogLoaded':
      return handleLogLoaded(state);
    default:
      return state;
  }
});

async function updateConnectedAccount(state, { account }) {
  return {
    ...state,
    account,
  };
}

async function initState() {
  const [openTime, startTime, numberOfRounds, foundation] = await Promise.all([
    getOpenTime(),
    getStartTime(),
    getNumberOfRounds(),
    getFoundation(),
  ]);

  return {
    openTime,
    startTime,
    numberOfRounds,
    foundation,
    createFirstRound: 0,
    createPerRound: 0,
  };
}

async function handleLogLoaded(state) {
  const [
    openTime,
    startTime,
    numberOfRounds,
    foundation,
    createFirstRound,
    createPerRound,
  ] = await Promise.all([
    getOpenTime(),
    getStartTime(),
    getNumberOfRounds(),
    getFoundation(),
    getCreateFirstRound(),
    getCreatePerRound(),
  ]);

  return {
    ...state,
    openTime,
    startTime,
    numberOfRounds,
    foundation,
    createFirstRound,
    createPerRound,
  };
}

async function getOpenTime() {
  return convertDate(await app.call('openTime').toPromise());
}

async function getStartTime() {
  return convertDate(await app.call('startTime').toPromise());
}

async function getNumberOfRounds() {
  return parseInt(await app.call('numberOfDays').toPromise(), 10);
}

async function getCreateFirstRound() {
  return parseInt(await app.call('createFirstDay').toPromise(), 10);
}

async function getCreatePerRound() {
  return parseInt(await app.call('createPerDay').toPromise(), 10);
}

async function getFoundation() {
  return app.call('foundation').toPromise();
}
