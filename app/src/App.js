import React from 'react';
import styled from 'styled-components';
import { useAragonApi } from '@aragon/api-react';
import { Main, Text } from '@aragon/ui';

import AuctionInformation from './containers/AuctionInformation';

function App() {
  const { appState } = useAragonApi();
  const { isSyncing } = appState;

  return (
    <Main>
      <AppContainer>
        <Header>
          <Text size="xlarge">cyber~Auction</Text>
        </Header>
        {isSyncing && <Syncing />}
        <AuctionInformation />
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
`;

export default App;
