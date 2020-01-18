import React from 'react';
import styled from 'styled-components';
import { useAragonApi } from '@aragon/api-react';
import { Main, Text } from '@aragon/ui';

import AuctionInformation from './containers/AuctionInformation';
import AuctionRounds from './containers/AuctionRounds';
import ControlPanel from './containers/ControlPanel';
import Welcome from './components/Welcome'
import useAuctionRoundNumber from './hooks/auction-round-number';

function App() {
  const { appState } = useAragonApi();
  const { isSyncing } = appState;
  const currentRound = useAuctionRoundNumber();

  return (
    <Main>
      <AppContainer>
        <Header>
          <Text size="xxlarge">Dashboard</Text>
          <ControlPanel currentRound={currentRound} />
        </Header>
        <Welcome />
        {isSyncing && <Syncing />}
        <AuctionInformation currentRound={currentRound} />
        <AuctionRoundsTable currentRound={currentRound} />
      </AppContainer>
    </Main>
  );
}

const AppContainer = styled.div`
  padding: 0 60px;
`;

const Syncing = styled.div.attrs({ children: 'Syncing…' })`
  position: absolute;
  top: 15px;
  right: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 30px 0;
  align-items: center;
`;

const AuctionRoundsTable = styled(AuctionRounds)`
  margin-top: 40px;
`;

export default App;
