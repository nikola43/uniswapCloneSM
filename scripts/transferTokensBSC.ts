
import { ethers } from 'hardhat'
import { formatEther, parseEther } from 'ethers/lib/utils';
import test_util, { sleep } from './util'
import { Contract } from 'ethers';
const colors = require('colors/safe');



const deployedTokens = [];
let to = ""

async function main() {



    const [deployer] = await ethers.getSigners();
    if (deployer === undefined) throw new Error("Deployer is undefined.");
    console.log(
        colors.cyan("Deployer Address: ") + colors.yellow(deployer.address)
    );
    console.log(
        colors.cyan("Account balance: ") +
        colors.yellow(formatEther(await deployer.getBalance()))
    );
    console.log();

    to = "0x3333415EA01BfA26ae2992763acae18ae289BB8F"

    const tokens = ["0x654388E2acb0762bC49c7A73B7A901D0da2ddAf4",
        "0x74D5F954DB2Ae57566834E9F44D07E63769A4857",
        "0x8c893a9b0fd5Aba4089b111AA46d4C60749A599b",
        "0xBE1451E58d47B6C2F95e7f672E199Fe8c3969085",
        "0x5fb7E946f15F6780cF620eba1Acf76Db452d7B4c",
        "0xd4cfc5D22a453b541159C2Ee1b2B0eD5dfafEE21",
        "0x9e468478D1f8f0d51d97cA8323bA726AAa4Bbb9F",
        "0xF2C3299E409b4bB64e2854C0D0D4c44DdeDbC0CB",
        "0x1bc832705F4b08390cf32bE1c4A7f2E2EA7c0E7C"]


    for (let i = 0; i < tokens.length; i++) {
        let token = await ethers.getContractAt("Token", tokens[i])
        await token.transfer(to, parseEther("100"))
        await test_util.sleep("15");
    }

    return true;
}



main()
    .then(async (r: any) => {
        console.log("");
        return r;
    })
    .catch(error => {
        console.log(colors.red("ERROR :("));
        console.log(colors.red(error));
        return undefined;
    })


