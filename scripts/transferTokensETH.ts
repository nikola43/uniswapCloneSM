
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



    const tokens: string[] = [
        "0xc2E75a902448d328018699977b13065361038F41",
        "0xeB2f964525B40229b8C7D205Da7D04E4d10d2914",
        "0x17ec1f8c46c85b67E628778BB6f190F714c591DD",
        "0xfd58Ecb221a3F3471872099023f2b0809DDf51ea",
        "0x02CB4f7Ae950Fc9c83221Dc26d50E004cF8C853b",
        "0x136CaF699A99bb58eE3358E3F156B160eA1861eA",
        "0xBd73baB219DB051F6cdb281c9e3780c3EE105751",
        "0x4103dF287F6665Bd2fA08cc6209082675B418F74",
        "0xdFCA40576F383f034876932E07A1c7d6014f39f6",
        "0xde9456399c99EBc00395544aA309f0BD53926A14",
        "0xF46322b82780D018532C2F7F9eA232BF34777DBa",
        "0x1fcBBa8cfB74083ADf39e7ab1B2c7e21e0510aec",
        "0xBd22beA0e6F04925c5b664C40Cbcc914f2805251",
        "0x6B25e969dF4C16a1aDfb6f8e8C54B023aFF14839",
        "0x9f4140847231A0de897158455Bc46E2248E31fc9"

    ]


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


