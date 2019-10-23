import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Aragon, { events } from '@aragon/api'

const app = new Aragon()

app.store(async (state, { event }) => {
  let nextState = { ...state }

  // Initial state
  if (state == null) {
    nextState = {
      openTime: await getOpenTime(),
      startTime: await getStartTime(),
      numberOfDays: await getNumberOfDays(),
      createFirstDay: await getCreateFirstDay(),
      createPerDay: await getCreatePerDay(),
      foundation: await getFoundation(),
    }
  }

  switch (event) {  
    case events.SYNC_STATUS_SYNCING:
      nextState = { ...nextState, isSyncing: true }
      break
    case events.SYNC_STATUS_SYNCED:
      nextState = { ...nextState, isSyncing: false }
      break
  }

  return nextState
})

async function getOpenTime() {
  return parseInt(await app.call('openTime').toPromise(), 10)
}

async function getStartTime() {
  return parseInt(await app.call('startTime').toPromise(), 10)
}

async function getNumberOfDays() {
  return parseInt(await app.call('numberOfDays').toPromise(), 10)
}

async function getCreateFirstDay() {
  return parseInt(await app.call('createFirstDay').toPromise(), 10)
}

async function getCreatePerDay() {
  return parseInt(await app.call('createPerDay').toPromise(), 10)
}

async function getFoundation() {
  return await app.call('foundation').toPromise()
}
