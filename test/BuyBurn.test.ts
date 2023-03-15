import { ethers } from 'hardhat'
const test_util = require('../scripts/util');
const colors = require('colors');
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Contract } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
const { getImplementationAddress } = require('@openzeppelin/upgrades-core')

//available functions
describe("Token contract", async () => {
    let deployer: SignerWithAddress;
    let bob: SignerWithAddress;
    let alice: SignerWithAddress;
    let PLSXBuyAndBurnV3: Contract;
    let SFY_ETH: Contract;
    let SFYX_ETH: Contract;
    let SFY_SFYX: Contract;

    const WETH = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"
    const factoryAddress = "0x348ED784BB223F49DF3C7bC7EAC7139095dfF08e"
    const SFY_ETHAddress = "0x38fE5F2caF0176DEF63480540c8063d1D3586dBd";
    const SFYX_ETHAddress = "0x70b73AC3C37ffAAdD173eFBDfddd0b1E8FA7829B";
    const SFY_SFYXAddress = "0xCF029830b9fFf03Af6E833C216678CEc883A51e7";
    const SFYXAddress = "0x4a364546B6765a3469ab131b96ddEbe4A2199082"



    it("1. Get Signer", async () => {
        const signers = await ethers.getSigners();
        if (signers[0] !== undefined) {
            deployer = signers[0];
            console.log(`${colors.cyan('Deployer Address')}: ${colors.yellow(deployer?.address)}`)
        }
        if (signers[1] !== undefined) {
            bob = signers[1];
            console.log(`${colors.cyan('Bob Address')}: ${colors.yellow(bob?.address)}`)
        }
        if (signers[2] !== undefined) {
            alice = signers[2];
            console.log(`${colors.cyan('Alice Address')}: ${colors.yellow(alice?.address)}`)
        }
    });

    it("2. Deploy PLSXBuyAndBurnV3", async () => {


        SFY_ETH = await ethers.getContractAt('UniswapV2Pair', SFY_ETHAddress)
        SFYX_ETH = await ethers.getContractAt('UniswapV2Pair', SFYX_ETHAddress)
        SFY_SFYX = await ethers.getContractAt('UniswapV2Pair', SFY_SFYXAddress)

        let contractName = "PLSXBuyAndBurnV3"
        const contractFactory = await ethers.getContractFactory(contractName);
        PLSXBuyAndBurnV3 = await contractFactory.deploy(factoryAddress, WETH, SFYXAddress);

        console.log(colors.cyan("PLSXBuyAndBurnV3 Address: ") + colors.yellow(PLSXBuyAndBurnV3.address));


    });

    it("2.  setAnyAuth", async () => {
        await PLSXBuyAndBurnV3.setAnyAuth();
    });

    it("2. Deploy convertLps SFY_ETHAddress", async () => {
        await SFY_ETH.transfer(PLSXBuyAndBurnV3.address, parseEther("1"));
        await PLSXBuyAndBurnV3.convertLps([SFY_ETHAddress]);
    });


    it("2. Deploy convertLps SFYX_ETHAddress", async () => {
        await SFYX_ETH.transfer(PLSXBuyAndBurnV3.address, parseEther("1"));
        await PLSXBuyAndBurnV3.convertLps([SFYX_ETHAddress]);
    });

    it("2. Deploy convertLps SFY_SFYXAddress", async () => {
        await SFY_SFYX.transfer(PLSXBuyAndBurnV3.address, parseEther("1"));
        await PLSXBuyAndBurnV3.convertLps([SFY_SFYXAddress]);
    });

});