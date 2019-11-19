import React from 'react';
import styled from 'styled-components';
import { Table, TableRow, TableCell, Text, theme } from '@aragon/ui';
import Timer from '../Timer';

function AuctionDetails({
  currentRound,
  numberOfRounds,
  raised,
  currentPrice,
  timeLeft,
  cap,
}) {
  return (
    <Table>
      <TableRow>
        <TableHeader colSpan="5">
          <Text color={theme.textSecondary} size="xsmall">
            Auction information
          </Text>
        </TableHeader>
      </TableRow>
      <TableRow>
        <TableCell>
          <div>
            <Text color={theme.textSecondary}>Round</Text>
            <br />
            <Text size="xxlarge">
              {currentRound} of {numberOfRounds}
            </Text>
          </div>
        </TableCell>
        <TableCell>
          <div>
            <Text color={theme.textSecondary}>Raised, ETH</Text>
            <br />
            <Text size="xxlarge">{raised}</Text>
          </div>
        </TableCell>
        <TableCell>
          <div>
            <Text color={theme.textSecondary}>Current Price, ETH/GGOL</Text>
            <br />
            <Text size="xxlarge">{currentPrice}</Text>
          </div>
        </TableCell>
        <TableCell>
          <div>
            <Text color={theme.textSecondary}>Left in round</Text>
            <br />
            <Timer size="xxlarge" timeLeft={timeLeft} />
          </div>
        </TableCell>
        <TableCell>
          <div>
            <Text color={theme.textSecondary}>GOL CAP, ETH</Text>
            <br />
            <Text size="xxlarge">{cap}</Text>
          </div>
        </TableCell>
      </TableRow>
    </Table>
  );
}

const TableHeader = styled(TableCell)`
  padding: 10px 20px;
`;

export default AuctionDetails;
