import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SidePanel, Button, TextInput, Text, theme } from '@aragon/ui';

import { safeToString } from '../../common/helper';

function ClaimSidePanel({
  opened,
  onClose,
  onSubmit,
  maxValue,
  initialValue = '',
}) {
  const [window, setWindow] = useState(safeToString(initialValue));
  const isValid = window && window >= 0 && (!maxValue || window <= maxValue);

  useEffect(() => setWindow(safeToString(initialValue)), [initialValue]);

  return (
    <SidePanel title="Claim" opened={opened} onClose={onClose}>
      <WindowTitle size="xsmall" color={theme.textSecondary}>
        Window <span style={{ color: theme.accent }}>*</span>
      </WindowTitle>
      <WindowInput
        type="number"
        min="0"
        max={maxValue}
        value={window}
        onChange={e => setWindow(e.target.value)}
      />
      <Button
        mode="strong"
        disabled={!isValid}
        onClick={() => onSubmit(window)}
      >
        Claim
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

export default ClaimSidePanel;
