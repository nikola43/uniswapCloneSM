
import { ethers } from 'hardhat'
import { formatEther } from 'ethers/lib/utils';
import test_util from './util'
import { Contract } from 'ethers';
const colors = require('colors/safe');
async function main() {

    let CakePool: Contract;

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

    const SFYX = "0xab738F29E55DF25D69006AAEFb638307b9b0ED3E"
    const MasterChefV2 = "0x8024c5299c301fbB87d2e6Df6f4F6bdF7B80B9C8"
    const _burnAdmin = deployer.address;
    const _treasury = "0x334e0B1c6031EB348DDfABd60C45b5ff8Cb8f6b9";
    const _operator = "0x334e0B1c6031EB348DDfABd60C45b5ff8Cb8f6b9";
    const _pid = 0;

    let contractName = "CakePool"
    const contractFactory = await ethers.getContractFactory(contractName);
    CakePool = await contractFactory.deploy(SFYX, MasterChefV2, _burnAdmin, _treasury, _operator, _pid);

    console.log(colors.cyan("CakePool Address: ") + colors.yellow(CakePool.address));

    await test_util.sleep("120");
    //await test_util.updateABI(contractName)
    await test_util.verify(CakePool.address, contractName, [SFYX, MasterChefV2, _burnAdmin, _treasury, _operator, _pid])

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


