import React from 'react';
import styled from 'styled-components';
import { Table, TableRow, TableCell, Text, theme } from '@aragon/ui';
import Timer from '../Timer';
import { isEmpty } from '../../common/helper';

const PLACEHOLDER = '-';

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
              {isEmpty(currentRound) || isEmpty(numberOfRounds)
                ? PLACEHOLDER
                : `${currentRound} of ${numberOfRounds}`}
            </Text>
          </div>
        </TableCell>
        <TableCell>
          <div>
            <Text color={theme.textSecondary}>Raised, ETH</Text>
            <br />
            <Text size="xxlarge">{isEmpty(raised) ? PLACEHOLDER : raised}</Text>
          </div>
        </TableCell>
        <TableCell>
          <div>
            <Text color={theme.textSecondary}>Current Price, ETH/GGOL</Text>
            <br />
            <Text size="xxlarge">
              {isEmpty(currentPrice) ? PLACEHOLDER : currentPrice}
            </Text>
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
            <Text size="xxlarge">{isEmpty(cap) ? PLACEHOLDER : cap}</Text>
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
