
import { ethers } from 'hardhat'
import { formatEther } from 'ethers/lib/utils';
import test_util from './util'
import { Contract } from 'ethers';
const colors = require('colors/safe');
async function main() {

    let SFY: Contract;

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

    let contractName = "SFY"
    const contractFactory = await ethers.getContractFactory(contractName);
    SFY = await contractFactory.deploy();

    console.log(colors.cyan("SFY Address: ") + colors.yellow(SFY.address));
    console.log(colors.cyan("Deployer SFY balance : ") + colors.yellow(await SFY.balanceOf(deployer.address)));

    await test_util.sleep("60");
    //await test_util.updateABI(contractName)
    await test_util.verify(SFY.address, contractName)

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


