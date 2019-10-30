import React from 'react'
import { useAragonApi } from '@aragon/api-react'
import { Main, Button } from '@aragon/ui'
import styled from 'styled-components'

function App() {
  const { api, appState } = useAragonApi()
  const { 
    openTime,
    startTime,
    numberOfDays,
    createFirstDay,
    createPerDay,
    foundation,
    isSyncing 
  } = appState
  console.log(isSyncing)
  return (
    <Main>
      <BaseLayout>
        {isSyncing && <Syncing />}
        <Count>openTime: {openTime}</Count>
        <Count>startTime: {startTime}</Count>
        <Count>numberOfDays: {numberOfDays}</Count>
        <Count>createFirstDay: {createFirstDay}</Count>
        <Count>createPerDay: {createPerDay}</Count>
        <Count>foundation: {foundation}</Count>
        <Buttons>
          <Button mode="secondary" onClick={() => api.buy({value: 100000000000000000}).toPromise()}>
            Buy
          </Button>
          <Button mode="secondary" onClick={() => api.load(20).toPromise()}>
            Load
          </Button>
        </Buttons>
      </BaseLayout>
    </Main>
  )
}

const BaseLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
`

const Count = styled.h1`
  font-size: 30px;
`

const Buttons = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 40px;
  margin-top: 20px;
`

const Syncing = styled.div.attrs({ children: 'Syncing…' })`
  position: absolute;
  top: 15px;
  right: 20px;
`

export default App
