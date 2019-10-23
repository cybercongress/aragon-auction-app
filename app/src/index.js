import React from 'react'
import ReactDOM from 'react-dom'
import { AragonApi } from '@aragon/api-react'
import App from './App'

const reducer = state => {
  if (state === null) {
    return {
      openTime: 0,
      startTime: 0,
      numberOfDays: 0,
      createFirstDay: 0,
      createPerDay: 0,
      foundation: "",
      isSyncing: true,
    }
  }
  return state
}

ReactDOM.render(
  <AragonApi reducer={reducer}>
    <App />
  </AragonApi>,
  document.getElementById('root')
)
