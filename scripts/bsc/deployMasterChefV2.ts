
import { ethers } from 'hardhat'
import { formatEther } from 'ethers/lib/utils';
import test_util from '../util'
import { Contract } from 'ethers';
const colors = require('colors/safe');
async function main() {

    let MasterChefV2: Contract;

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
    const _burnAdmin = deployer.address;

    let contractName = "MasterChefV2"
    const contractFactory = await ethers.getContractFactory(contractName);
    MasterChefV2 = await contractFactory.deploy(SFYX, _burnAdmin);

    console.log(colors.cyan("MasterChef Address: ") + colors.yellow(MasterChefV2.address));

    await test_util.sleep("120");
    //await test_util.updateABI(contractName)
    await test_util.verify(MasterChefV2.address, contractName, [SFYX, _burnAdmin])

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


