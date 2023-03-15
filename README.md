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

npx hardhat node --fork https://rpc.ankr.com/eth_goerli
npx hardhat test test/BuyBurn.test.ts --network localhost

# TEST ZOE
npx hardhat node --fork https://rpc.ankr.com/eth --fork-block-number 15687262
npx hardhat test test/TestZoeToken.test.ts --network localhost

nodemon --watch test/TestZoeToken.test.ts --exec 'npx hardhat test test/TestZoeToken.test.ts --network localhost'

-------------------------
SFY Address: 0xefc5bAE08de485DA4D4425B2Ad4adf44FF2F3844
SFYX Address: 0x4a364546B6765a3469ab131b96ddEbe4A2199082
UniswapV2Router02 Address: 0x6fe42022A36D54F275De6753A025978d8Ec20625
UniswapV2Factory Address: 0x348ED784BB223F49DF3C7bC7EAC7139095dfF08e
INIT_CODE_PAIR_HASH: 0xb905cc95365a48260c9c7b67c7268f693f07520257ebfb5fa32bc986f4f4fa84

feeToSetter: 0x0a40F96d0a9C78dA57f4Dba1c7eCFf747D0e0565
feeTo1: 0x5e8a2A6c9443Fe2460C1eec1Ecb73C90196D7DFc
feeTo2: 0x9aA2C6b1a94C96e070f24D7b36b104F6a2779100

SFY  / ETH = 0x38fE5F2caF0176DEF63480540c8063d1D3586dBd
SFYX / ETH = 0x70b73AC3C37ffAAdD173eFBDfddd0b1E8FA7829B
SFY  / SFYX = 0xCF029830b9fFf03Af6E833C216678CEc883A51e7
WETH = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"

MasterChefV2 = 0x5Fe1C14b7C07E448127D4815e588A946c4C42Be2
CakePool: 0xf801bB69847e42a082F523d0D852C56909EA4898

PLSXBuyAndBurnV3 Address: 0x65D546E4D6C9325B7b3516b2afa2F0bCA9986fc8
MasterChef Address: 0x6e41565807d92A19d02A4e60A69efc049eE4f0CA

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




npx hardhat run scripts/bsc/deploySFY.ts --network goerli
npx hardhat run scripts/bsc/deploySFYX.ts --network goerli
npx hardhat run scripts/bsc/deployUniswapV2Factory.ts --network goerli
npx hardhat run scripts/bsc/deployUniswapV2Router02.ts --network goerli

