# Auction Aragon Dapp for Cyber Foundation

## Status
1. Contract - alpha, general flow works, debugging
2. Front - prototyping mocks


## Description of flow


## Prepare
```
npm install @aragon/cli -g
```

## Run

In app directory (app hot reload and script rebuild)
```
npm run start
```

```
npm run watch:script
```

In project root
```
npm run start:ipfs:template
```

## Deploy to DAO
```
aragon apm publish major --env rinkeby

npx dao install 0x9AcEB41994265da9B4e0c762983ceAD027282a37 auction.open.aragonpm.eth latest --app-init-args 8 1571841041 1571842841 0x0c560f66fcebd770adaa61504f00a91419d1f1a5 0x1e48db324b514dd0a89d1a8ec6914be96aea70c0 --env rinkeby

npx dao apps 0x9AcEB41994265da9B4e0c762983ceAD027282a37 --all --environment rinkeby --apm.ipfs.rpc https://ipfs.eth.aragon.network/ipfs/

npx dao acl create 0x9AcEB41994265da9B4e0c762983ceAD027282a37 0xBcBF36B753763BDcde56DCB47eb1AB22638c7D64 CREATOR_ROLE 0x86d2E649633026146958e0e00825bbEEC02F6859 0x86d2E649633026146958e0e00825bbEEC02F6859 --environment rinkeby
```

## Verificaition/Remix
```
truffle-flattener contracts/Auction.sol > AuctionFull.sol
```

## Debug
[eth-cli](https://github.com/protofire/eth-cli)

```
```

## Proposed Front