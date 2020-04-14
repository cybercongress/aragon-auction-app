# Aragon Auction Dapp

## About the app
By using the Auction application, users may acquire tokens that are allocated for distribution within the Foundation.

Please note, that for the set of euler~Foundation we use GOL tokens, which are the equivalent of THC tokens for cyber ~Foundation, which will be deployed to cybers mainnet. The lasting times of the rounds will also vary from euler to cyber Foundation.

The auction consists of rounds. A so-called `zero` window, which is longer than the other windows and with more tokens for distribution. The subsequent rounds (windows) have equal length and an equal amount of tokens for distribution. This is done purely for traction and allows certain economic mechanisms to work to their full efficiency.

Donors may send ETH to the auction and choose the round or the rounds they want to participate in beforehand. The actioned tokens will become available for transfer after a given round has passed. I.E. if I send ETH to window 5 of the auction, my THC will become available for transfer (and hence, vesting) after window 5 is over. 

Each round a certain amount of GOL (THC) tokens is auctioned. The amount of GOL (THC) the donors receive is proportional to the donated amount in that round. I.E. if 10 tokens are available for auction at round 5, and 10 ETH from 10 people were donated, each person will receive 1 token after the end of the round. 

Window 0 is a 10-day round (during euler testing). Subsequent rounds of the auction, in both testnets and mainnet, will last for 23 hours + 1 second. Overall, there are 479 rounds in the mainnet (and 49 fo the testing). Which totals to just over\~480 days of the auction with round 0 in the mainnet (roughly 47 days for euler testing). We strongly recommend reading more information about the auction and the distribution games [here](https://github.com/cybercongress/congress/blob/master/ecosystem/Cyber%20Homestead%20doc.md#the-distribution-games-in-details).

The accumulated ETH is available for transfer at any time to the Foundations DAO agent by any participant of the auction. Of course, from this point onwards, those ETH’s are controlled via the governance mechanisms of cyber\~Foundation.

Features:
- Buy tokens
- Claim tokens
- Collect ETH for foundation

If someone acquired THC tokens during the auction but didn't claim them after some time had passed (7 days), those THC tokens will be burned from the auction balance.

Under the hood the process is also fairly simple:
- The auction has a start time and
- An open time. What happens in between is called round 0
- There are 2 actions, that allow users to either acquire on a certain round for a certain amount of ETH
- And claim after a certain round has finished and the price has been calculated
- After the claim, the user may use the vesting app to vest the received THC until the end of the auction and receive CYB. They may also transfer their THC and use them

## Description of flow

## Prepare
```
npm install @aragon/cli -g
```
Note: We recommend use node v10.18.0 and aragon CLI v7.0.4 or latest

## Development

In /app directory (app hot reload and script rebuild)
```
npm run start
```

```
npm run watch:script
```

In project root
```
npm run start:http:template
```

## Deploy to you DAO

## Verification

## License
