import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SidePanel, Button, TextInput, Text, theme } from '@aragon/ui';

function BuySidePanel({
  opened,
  onClose,
  onSubmit,
  maxWindow,
  initialWindow = '',
  maxAmount,
  initialAmount = '',
}) {
  const [window, setWindow] = useState(initialWindow);
  const [amount, setAmount] = useState(initialAmount);
  const isValidWindow =
    window && window > 0 && (!maxWindow || window <= maxWindow);
  const isValidAmount =
    amount && amount > 0 && (!maxAmount || amount <= maxAmount);
  const isValid = isValidWindow && isValidAmount;

  useEffect(() => setWindow(initialWindow), [initialWindow]);
  useEffect(() => setAmount(initialAmount), [initialAmount]);

  return (
    <SidePanel title="Buy" opened={opened} onClose={onClose}>
      <WindowTitle size="xsmall" color={theme.textSecondary}>
        Window <span style={{ color: theme.accent }}>*</span>
      </WindowTitle>
      <WindowInput
        type="number"
        min="0"
        max={maxWindow}
        value={window}
        onChange={e => setWindow(e.target.value)}
      />
      <AmountTitle size="xsmall" color={theme.textSecondary}>
        Amount <span style={{ color: theme.accent }}>*</span>
      </AmountTitle>
      <AmountInput
        type="number"
        min="0"
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
