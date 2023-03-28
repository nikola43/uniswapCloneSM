import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { Contract } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import { ethers } from 'hardhat';
const test_util = require('../scripts/util');
const colors = require('colors');

import { SFYXBuyAndBurn, SFYXBuyAndBurn__factory } from '../typechain'

//available functions
describe("Token contract", async () => {
    let deployer: SignerWithAddress;
    let bob: SignerWithAddress;
    let alice: SignerWithAddress;
    let sfyxBuyAndBurn: SFYXBuyAndBurn;
    let SFY_ETH: Contract;
    let SFYX_ETH: Contract;
    let SFY_SFYX: Contract;
    let SFYX: Contract;
    let SFY: Contract;

    const WETH = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"
    const factoryAddress = "0x98c63E02E729e53639c044F377Ad4E11C85F7703"
    const SFY_ETHAddress = "0x224E4d86886377eFDfD5e144772b1175920cB048";
    const SFYX_ETHAddress = "0x79Da21BA74AF3cAC8e930df20b023B748a955d9d";
    const SFY_SFYXAddress = "0x9665C84e5AD2356B323ad60053feAE98126ab91D";
    const SFYXAddress = "0xab738F29E55DF25D69006AAEFb638307b9b0ED3E"
    const SFYAddress = "0x65f6E06C324c7c167576756A365e221BC0657816"

    it("1. Get Signer", async () => {
        const signers = await ethers.getSigners();

        deployer = signers[0];
        bob = signers[1];
        alice = signers[2];

        console.log(`${colors.cyan('Deployer Address')}: ${colors.yellow(deployer?.address)}`)
        console.log(`${colors.cyan('Bob Address')}: ${colors.yellow(bob?.address)}`)
        console.log(`${colors.cyan('Alice Address')}: ${colors.yellow(alice?.address)}`)
    });

    it("2. Init contracts", async () => {
        SFY_ETH = await ethers.getContractAt('9inchPair', SFY_ETHAddress)
        SFYX_ETH = await ethers.getContractAt('9inchPair', SFYX_ETHAddress)
        SFY_SFYX = await ethers.getContractAt('9inchPair', SFY_SFYXAddress)
        SFYX = await ethers.getContractAt('SFYX', SFYXAddress)
        SFY = await ethers.getContractAt('SFY', SFYAddress)

        const SFY_ETHBalance = await SFY_ETH.balanceOf(deployer.address);
        const SFYX_ETHBalance = await SFYX_ETH.balanceOf(deployer.address);
        const SFY_SFYXBalance = await SFY_SFYX.balanceOf(deployer.address);
        const SFYXBalance = await SFYX.balanceOf(deployer.address);
        const SFYBalance = await SFY.balanceOf(deployer.address);

        console.log(colors.cyan("SFY_ETH Balance: ") + colors.yellow(SFY_ETHBalance.toString()));
        console.log(colors.cyan("SFYX_ETH Balance: ") + colors.yellow(SFYX_ETHBalance.toString()));
        console.log(colors.cyan("SFY_SFYX Balance: ") + colors.yellow(SFY_SFYXBalance.toString()));
        console.log(colors.cyan("SFYX Balance: ") + colors.yellow(SFYXBalance.toString()));
        console.log(colors.cyan("SFY Balance: ") + colors.yellow(SFYBalance.toString()));
    });

    it("2. Deploy PLSXBuyAndBurnV3", async () => {
        sfyxBuyAndBurn = await new SFYXBuyAndBurn__factory(deployer).deploy(factoryAddress, SFYAddress, SFYXAddress, WETH);
        console.log(colors.cyan("PLSXBuyAndBurnV3 Address: ") + colors.yellow(sfyxBuyAndBurn.address));
    });

    // tests for setAnyAuth function
    it("2. setAnyAuth", async () => {
        await sfyxBuyAndBurn.setAnyAuth();
        let auth = await sfyxBuyAndBurn.anyAuth();
        expect(auth).to.equal(true);
        console.log(colors.cyan("setAnyAuth: ") + colors.yellow(auth));
    });

    // tests convertLps SFY_ETHAddress
    it("3. Transfer SFY_ETH to burn contract", async () => {
        await SFY_ETH.transfer(sfyxBuyAndBurn.address, parseEther("10"));
    });

    it("3. convertLps SFY_ETHAddress", async () => {
        await SFY_ETH.transfer(sfyxBuyAndBurn.address, parseEther("10"));
        await sfyxBuyAndBurn.convertLps([SFY_ETHAddress]);
        expect(await SFY_ETH.balanceOf(sfyxBuyAndBurn.address)).to.equal(0);
        expect(await SFY.balanceOf(sfyxBuyAndBurn.address)).to.equal(0);
        expect(await SFYX.balanceOf(sfyxBuyAndBurn.address)).to.equal(0);
        expect(await SFY.balanceOf(deployer.address)).to.equal(parseEther("629.986733616458038732"));
        expect(await SFYX.balanceOf(deployer.address)).to.equal(parseEther("0.088872915404853052"));
    });

    /*
    it("2. Deploy convertLps SFY_ETHAddress", async () => {
        await SFY_ETH.transfer(sfyxBuyAndBurn.address, parseEther("1"));
        await sfyxBuyAndBurn.convertLps([SFY_ETHAddress]);
    });


    it("2. Deploy convertLps SFYX_ETHAddress", async () => {
        await SFYX_ETH.transfer(sfyxBuyAndBurn.address, parseEther("1"));
        await sfyxBuyAndBurn.convertLps([SFYX_ETHAddress]);
    });

    it("2. Deploy convertLps SFY_SFYXAddress", async () => {
        await SFY_SFYX.transfer(sfyxBuyAndBurn.address, parseEther("1"));
        await sfyxBuyAndBurn.convertLps([SFY_SFYXAddress]);
    });
    */

});