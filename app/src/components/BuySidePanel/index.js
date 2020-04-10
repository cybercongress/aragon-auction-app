import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SidePanel, Button, TextInput, Text, theme } from '@aragon/ui';

import { safeToString } from '../../common/helper';

function BuySidePanel({
  opened,
  onClose,
  onSubmit,
  minWindow = '0',
  maxWindow,
  initialWindow = '',
  maxAmount,
  initialAmount = '',
  minAmount = '0',
}) {
  const [window, setWindow] = useState(safeToString(initialWindow));
  const [amount, setAmount] = useState(safeToString(initialAmount));
  const isValidWindow =
    window && window >= minWindow && (!maxWindow || window <= maxWindow);
  const isValidAmount =
    amount && amount > minAmount && (!maxAmount || amount <= maxAmount);
  const isValid = isValidWindow && isValidAmount;

  useEffect(() => setWindow(safeToString(initialWindow)), [initialWindow]);
  useEffect(() => setAmount(safeToString(initialAmount)), [initialAmount]);

  return (
    <SidePanel title="Buy" opened={opened} onClose={onClose}>
      <WindowTitle size="xsmall" color={theme.textSecondary}>
        Round <span style={{ color: theme.accent }}>*</span>
      </WindowTitle>
      <WindowInput
        type="number"
        min={minWindow}
        max={maxWindow}
        value={window}
        onChange={e => setWindow(e.target.value)}
      />
      <AmountTitle size="xsmall" color={theme.textSecondary}>
        Amount, ETH <span style={{ color: theme.accent }}>*</span>
      </AmountTitle>
      <AmountInput
        type="number"
        min={minAmount}
        max={maxAmount}
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <Button
        mode="strong"
        disabled={!isValid}
        onClick={() => onSubmit(window, amount)}
      >
        Buy
      </Button>
    </SidePanel>
  );
}

const WindowTitle = styled(Text)`
  margin-top: 30px;
  margin-bottom: 5px;
`;

const WindowInput = styled(TextInput)`
  margin-bottom: 30px;
`;

const AmountTitle = styled(Text)`
  margin-bottom: 5px;
`;

const AmountInput = styled(TextInput)`
  margin-bottom: 30px;
`;

export default BuySidePanel;
