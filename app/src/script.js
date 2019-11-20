import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Aragon, { events } from '@aragon/api';
import { convertDate } from './common/helper';

const app = new Aragon();

app.store(async (state, { event, returnValues, blockNumber, address }) => {
  let nextState = { ...state };

  // Initial state
  if (state == null) {
    nextState = {
      openTime: 0,
      startTime: 0,
      numberOfRounds: 0,
      createFirstRound: 0,
      createPerRound: 0,
      foundation: '',
      raised: 0,
      currentPrice: 0,
    };
  }

  switch (event) {
    case events.ACCOUNTS_TRIGGER:
      return updateConnectedAccount(nextState, returnValues);
    case events.SYNC_STATUS_SYNCING:
      nextState = { ...nextState, isSyncing: true };
      break;
    case events.SYNC_STATUS_SYNCED:
      nextState = { ...nextState, isSyncing: false };
      break;
    case 'LogLoaded':
      return handleLogLoaded(nextState);
    default:
      return state;
  }

  return nextState;
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
    raised,
  ] = await Promise.all([
    getOpenTime(),
    getStartTime(),
    getNumberOfRounds(),
    getFoundation(),
    getCreateFirstRound(),
    getCreatePerRound(),
    getRaisedAmount(),
  ]);

  return {
    ...state,
    openTime,
    startTime,
    numberOfRounds,
    foundation,
    createFirstRound,
    createPerRound,
    raised,
    currentPrice: 0,
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

async function getRaisedAmount() {
  const { appAddress } = await app.currentApp().toPromise();

  return parseInt(await app.web3Eth('getBalance', appAddress).toPromise(), 10);
}

async function getFoundation() {
  return app.call('foundation').toPromise();
}
