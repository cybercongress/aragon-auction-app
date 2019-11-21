import React, { useState } from 'react';
import styled from 'styled-components';
import { useAragonApi } from '@aragon/api-react';
import { Button } from '@aragon/ui';
import { toWei } from 'web3-utils';

import ClaimSidePanel from '../../components/ClaimSidePanel';
import BuySidePanel from '../../components/BuySidePanel';
import useAuctionRound from '../../hooks/auction-round';
import { ROUND_DURATION, BUY_LIMIT } from '../../common/constants';

function ControlPanel(props) {
  const [claimSidePanelOpened, setClaimSidePanelOpened] = useState(false);
  const [buySidePanelOpened, setBuySidePanelOpened] = useState(false);
  const { api, appState } = useAragonApi();
  const { numberOfRounds, startTime, openTime } = appState;
  const currentRound = useAuctionRound(
    startTime,
    openTime,
    numberOfRounds,
    ROUND_DURATION
  );

  return (
    <div {...props}>
      <ActionButton mode="strong" onClick={() => api.claimAll().toPromise()}>
        Claim all
      </ActionButton>
      <ActionButton mode="strong" onClick={() => setClaimSidePanelOpened(true)}>
        Claim
      </ActionButton>
      <ActionButton mode="strong" onClick={() => setBuySidePanelOpened(true)}>
        Buy
      </ActionButton>
      <ActionButton mode="strong" onClick={() => api.collect().toPromise()}>
        Collect
      </ActionButton>
      <ClaimSidePanel
        maxValue={numberOfRounds}
        opened={claimSidePanelOpened}
        onClose={() => setClaimSidePanelOpened(false)}
        onSubmit={round => {
          setClaimSidePanelOpened(false);
          api.claim(round).toPromise();
        }}
      />
      <BuySidePanel
        minWindow={currentRound}
        maxWindow={numberOfRounds}
        opened={buySidePanelOpened}
        initialWindow={currentRound}
        onClose={() => setBuySidePanelOpened(false)}
        onSubmit={(round, amount) => {
          setBuySidePanelOpened(false);
          api
            .buyWithLimit(round, BUY_LIMIT, { value: toWei(amount, 'ether') })
            .toPromise();
        }}
      />
    </div>
  );
}

const ActionButton = styled(Button)`
  font-size: 16px;
  margin: 0 10px;
  width: 185px;
`;

export default ControlPanel;
