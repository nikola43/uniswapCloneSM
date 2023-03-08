
import { ethers } from 'hardhat'
import { formatEther } from 'ethers/lib/utils';
import test_util from '../util'
import { Contract } from 'ethers';
const colors = require('colors/safe');
async function main() {

    let MasterChef: Contract;

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

    const SFYX = "0xB864e65109db4d65fB2d16607bff5b1bF86EF4b5"
    const SFYXPerBlock = 40;

    let contractName = "MasterChef"
    const contractFactory = await ethers.getContractFactory(contractName);
    MasterChef = await contractFactory.deploy(SFYX, SFYXPerBlock);

    console.log(colors.cyan("MasterChef Address: ") + colors.yellow(MasterChef.address));

    await test_util.sleep("60");
    //await test_util.updateABI(contractName)
    await test_util.verify(MasterChef.address, contractName, [SFYX, SFYXPerBlock])

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


