pragma solidity 0.4.24;

import "../Auction.sol";


contract AuctionUtils {
    Auction public sale;

    constructor(Auction _sale) public {
        sale = _sale;
    }

    function dailyTotals() external view returns (uint[10] memory result) {
        for (uint i = 0; i < 10; i++) {
            result[i] = sale.dailyTotals(i);
        }
    }

    function userBuys(address user) external view returns (uint[10] memory result) {
        for (uint i = 0; i < 10; i++) {
            result[i] = sale.userBuys(i, user);
        }
    }

    function userClaims(address user) external view returns (bool[10] memory result) {
        for (uint i = 0; i < 10; i++) {
            result[i] = sale.claimed(i, user);
        }
    }
}