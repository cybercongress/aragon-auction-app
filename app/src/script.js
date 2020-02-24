import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Aragon, { events } from '@aragon/api';
import { toBN } from 'web3-utils';
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
      totalRaised: '0',
      totalRaisedByRound: {},
      rounds: {},
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
    case 'Loaded':
      return handleLoaded(nextState);
    case 'Buy':
      return handleBuy(nextState, returnValues);
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

async function handleBuy(state, { window, user, amount }) {
  const { rounds = {}, totalRaisedByRound = {}, totalRaised = '0' } = state;
  const round = rounds[window] || {};
  const raisedInRound = totalRaisedByRound[window] || '0';
  const amountBN = toBN(amount);
  const userBuys = round[user]
    ? toBN(round[user])
        .add(amountBN)
        .toString(10)
    : amount;

  return {
    ...state,
    rounds: {
      ...rounds,
      [window]: {
        ...round,
        [user]: userBuys,
      },
    },
    totalRaisedByRound: {
      ...totalRaisedByRound,
      [window]: toBN(raisedInRound)
        .add(amountBN)
        .toString(10),
    },
    totalRaised: toBN(totalRaised)
      .add(amountBN)
      .toString(10),
  };
}

async function handleLoaded(state) {
  const [
    openTime,
    startTime,
    numberOfRounds,
    createFirstRound,
    createPerRound,
  ] = await Promise.all([
    getOpenTime(),
    getStartTime(),
    getNumberOfRounds(),
    getCreateFirstRound(),
    getCreatePerRound(),
  ]);

  return {
    ...state,
    openTime,
    startTime,
    numberOfRounds,
    createFirstRound,
    createPerRound,
    totalRaised: '0',
    totalRaisedByRound: {},
    rounds: {},
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
