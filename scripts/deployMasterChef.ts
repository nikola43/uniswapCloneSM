
import { ethers } from 'hardhat'
import { formatEther } from 'ethers/lib/utils';
import test_util from './util'
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

    const SFYX = "0x4a364546B6765a3469ab131b96ddEbe4A2199082"
    const SFYXPerBlock = 40000000000000000000; // 40 tokens

    let contractName = "MasterChef"
    const contractFactory = await ethers.getContractFactory(contractName);
    MasterChef = await contractFactory.deploy(SFYX, SFYXPerBlock);

    console.log(colors.cyan("MasterChef Address: ") + colors.yellow(MasterChef.address));

    await test_util.sleep("120");
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


