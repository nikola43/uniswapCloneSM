# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

# Install Node
Install Node Version Manager 
Linux | MacOS -> https://github.com/nvm-sh/nvm
Windows -> https://github.com/coreybutler/nvm-windows

```
nvm install 16
```
```
nvm use 16
```

# Install dependences
```
npm install -g yarn
```

```
yarn install
```

# Deploy on Eth Goerli testnet
## 1 Add private key on .env file
## 2 Run deploy script all in one
```
npx hardhat run test/TestZoeToken.test.ts --network localhost
```

# Deploy With Remix
Should use flatenned version
```
npx hardhat flatten contracts/PoorPleb.sol > flattPoorPleb.sol
```
```
npx hardhat flatten contracts/MerkleAirdrop.sol > flattMerkleAirdrop.sol
```

# Testing
## Run local node
```
npx hardhat node --fork https://rpc.ankr.com/bsc_testnet_chapel
npx hardhat test test/TestAll.test.ts --network localhost
npx hardhat test test/TestToken.test.ts --network localhost
```

## Run tests
```
npx hardhat test test/TestZoeToken.test.ts --network localhost
npx hardhat verify --libraries tokenLibs.js 0xeEEC44E393465eE74Eb0Bfe2e5C6FC6Da53211B6 --network bscTestnet

```

npx hardhat node --fork https://rpc.ankr.com/bsc
npx hardhat test test/TestUpgradeKronus.test.ts --network localhost

# TEST ZOE
npx hardhat node --fork https://rpc.ankr.com/eth --fork-block-number 15687262
npx hardhat test test/TestZoeToken.test.ts --network localhost

nodemon --watch test/TestZoeToken.test.ts --exec 'npx hardhat test test/TestZoeToken.test.ts --network localhost'

-------------------------
SFY Address: 0x83b2161FA24E5105928dDAb37a368259C5cF9B9B
SFYX Address: 0xB864e65109db4d65fB2d16607bff5b1bF86EF4b5
UniswapV2Factory Address: 0x2f8405312afBc0204147596db9e7a3461dF37d5A
INIT_CODE_PAIR_HASH: 0xde2ba8c4a4dcd2005125e8af2ba4f0c2b8992301284322c0cfe03180f14132b6
UniswapV2Router02 Address: 0x946EAD146fF0b84A7193c3060C5380133243243F
feeToSetter: 0xD4C9e948681b98cf2a0DFe80823A0109e457F8fD
feeTo: 0x62fdf0c665C33FF642215639631C017F072153eB


I think PulseX is a fork of pancakeswap, if you could double check that would be great.

So we fork pancakeswap and strip it down to only 5 contracts / features.
Swap, Limit order, Liquidity, Farms & Pools. 
We remove lottery, prediction and all the other stuff.

Tokens: SFY + SFYX
$SFY (New name for TacoSwapToken) - Capped supply of 1 000 000 000 (1 billion), no inflation.
$SFYX (New name for Incentive token) - Inflated token, mints 40 new tokens per block. Initial supply 1 000 000 (1 million) for liquidity
Both are 18 decimal tokens.

Users get SFYX when staking or farming. This is the  reward token.


Swap:
The fee on each trade will be 0.3% 
And divided as follows:
0.22% LP providers
0.06% Buy and burn $SFY (New name for Taco token)
0.01% Buy and burn $SFYX (New name for Incentive token)

Farms:
SFY - SFYX 
SFYX - ETH
SFYX - USDC
SFY - ETH
SFY - USDC

Pools:
Single stake SFY get SFYX

Emission:
40 SFYX is minted every block.
Owner should be able to change that a part of this gets burned as a way of controlling inflation
(just like pancake, they mint 40 tokens atm and burn 30.1 tokens of them every block so that only 9.9 tokens/block get distributed as rewards)
To start we can divide the current emission into 7 equal parts.
1 for each farm pool, 1 for staking pool, 1 for dead address. So they get 40 / 7 = 5,714

Rewards = 5,714 tokens / block for each pool
Burn = 5,714 tokens / block

Burns:
I think pancake saves all the tokens to be burned on a certain wallet that will burn it after X-days/weeks.
Pancake makes burns weekly, we could do the same. Please check how PCS solves this, and we will go with a similar / same solution to work faster.
All burns should go to dead address.