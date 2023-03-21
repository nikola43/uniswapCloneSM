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
SFY Address: 0x65f6E06C324c7c167576756A365e221BC0657816
SFYX Address: 0xab738F29E55DF25D69006AAEFb638307b9b0ED3E

UniswapV2Factory Address: 0x98c63E02E729e53639c044F377Ad4E11C85F7703
INIT_CODE_PAIR_HASH: 0xb905cc95365a48260c9c7b67c7268f693f07520257ebfb5fa32bc986f4f4fa84
UniswapV2Router02 Address: 0xF94B05c180B62ff280f4Fc3f95efFAf80dbB93E8

Pool ID - Pair - Address
SFY  / ETH = 0x224E4d86886377eFDfD5e144772b1175920cB048
SFYX / ETH = 0x79Da21BA74AF3cAC8e930df20b023B748a955d9d
SFY  / SFYX = 0x9665C84e5AD2356B323ad60053feAE98126ab91D
PDL  / SFYX = 0x01a1AE7C459b4fE28D77E0B7FF4129041ec9c433
PP  / SFYX = 0x84e94d25A444Ed94c72f0EC3169Fd203069E4E5a
HEX  / SFYX = 0x9a4b59187C4079aE6f965474EF6Fe0c36895Edd3
DBI  / SFYX = 0xFE1837863c473B583ff76eEa9Ce0c1F712679498
HDRN  / SFYX = 0x0d76c8d0Cde2c4162D74560A711d179fE08DDEF7

MasterChefV2 = 0x8024c5299c301fbB87d2e6Df6f4F6bdF7B80B9C8
CakePool: 0x2c66bd72C1Db9AE036675050eCbFa787ce990c35

feeToSetter: 0x0a40F96d0a9C78dA57f4Dba1c7eCFf747D0e0565
feeTo1: 0x5e8a2A6c9443Fe2460C1eec1Ecb73C90196D7DFc
feeTo2: 0x9aA2C6b1a94C96e070f24D7b36b104F6a2779100

WETH = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"


PLSXBuyAndBurnV3 Address: 0x99F27Bfa28816EB18F0d9343e6F312CC7bf0081a
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




HDRN - 25,298 holders
https://etherscan.io/token/0x3819f64f282bf135d62168C1e513280dAF905e06

TEXAN - 22,381 holders
https://etherscan.io/token/0xcFCFfE432A48dB53F59c301422d2EdD77B2A88d7

ICOSA - 4,604 holders
https://etherscan.io/token/0xfc4913214444aF5c715cc9F7b52655e788A569ed

MAXI - 5,336 holders
https://etherscan.io/token/0x0d86EB9f43C57f6FF3BC9E23D8F9d82503f0e84b

TEAM - 858 holders
https://etherscan.io/token/0xB7c9E99Da8A857cE576A830A9c19312114d9dE02

DECI - 2,284 holders
https://etherscan.io/token/0x6b32022693210cD2Cfc466b9Ac0085DE8fC34eA6

LUCKY - 1,135 holders
https://etherscan.io/token/0x6B0956258fF7bd7645aa35369B55B61b8e6d6140

TRIO - 1,079 holders
https://etherscan.io/token/0xF55cD1e399e1cc3D95303048897a680be3313308

POLY - 1,967 holders
https://etherscan.io/token/0x9d93692E826A4bd9e903e2A27D7FbD1e116efdad

BASE - 944 holders
https://etherscan.io/token/0xe9f84d418B008888A992Ff8c6D22389C2C3504e0

PLSD - 12,465 holders
https://etherscan.io/token/0x34F0915a5f15a66Eba86F6a58bE1A471FB7836A7

PLSB - 5,757 holder
https://etherscan.io/token/0x5EE84583f67D5EcEa5420dBb42b462896E7f8D06

ASIC - 2,300 holders
https://etherscan.io/token/0x347a96a5BD06D2E15199b032F46fB724d6c73047

PP - 7,372 holders
https://etherscan.io/token/0x9565c2036963697786705120Fc59310F747bCfD0

IM - 3,072 holders
https://etherscan.io/token/0x0A58153a0CD1cfaea94cE1f7FdC5D7E679eCa936

MORE - 2066 holders
https://etherscan.io/token/0xbEEf3bB9dA340EbdF0f5bae2E85368140d7D85D0

PLD - 394 holders
https://etherscan.io/token/0x52Ada28F70BC8EBe5dd4381120d3CD76863919A8

PZEN - 2,397 holders
https://etherscan.io/token/0x5a24D7129B6f3FcAd2220296df28911880AD22B0

COM - 3,067 holders
https://etherscan.io/token/0x5A9780Bfe63f3ec57f01b087cD65BD656C9034A8

DBI - 3,478 holders
https://etherscan.io/token/0x2de509bf0014ddf697b220be628213034d320ece

XEN - 74,136 holders
https://etherscan.io/token/0x06450dEe7FD2Fb8E39061434BAbCFC05599a6Fb8

HEX - 323,757 holders
https://etherscan.io/token/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39
