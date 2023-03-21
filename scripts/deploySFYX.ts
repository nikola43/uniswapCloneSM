
import { ethers } from 'hardhat'
import { formatEther } from 'ethers/lib/utils';
import test_util from './util'
import { Contract } from 'ethers';
const colors = require('colors/safe');
async function main() {

    let SFYX: Contract;

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

    let contractName = "SFYX"
    const contractFactory = await ethers.getContractFactory(contractName);
    SFYX = await contractFactory.deploy();

    console.log(colors.cyan("SFYX Address: ") + colors.yellow(SFYX.address));
    console.log(colors.cyan("Deployer SFYX balance : ") + colors.yellow(await SFYX.balanceOf(deployer.address)));

    await test_util.sleep("60");
    //await test_util.updateABI(contractName)
    await test_util.verify(SFYX.address, contractName)

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


