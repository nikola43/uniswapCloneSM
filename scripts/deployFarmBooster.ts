
import { ethers } from 'hardhat'
import { formatEther } from 'ethers/lib/utils';
import test_util from './util'
import { Contract } from 'ethers';
const colors = require('colors/safe');
async function main() {

    let FarmBooster: Contract;

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
    const cakePool = "0x2c66bd72C1Db9AE036675050eCbFa787ce990c35"
    const MasterChefV2 = "0x8024c5299c301fbB87d2e6Df6f4F6bdF7B80B9C8"
    const max = 3
    const cA = 50000
    const cB = 10



    let contractName = "FarmBooster"
    const contractFactory = await ethers.getContractFactory(contractName);
    FarmBooster = await contractFactory.deploy(SFYX, cakePool, MasterChefV2, max, cA, cB);

    console.log(colors.cyan("MasterChef Address: ") + colors.yellow(FarmBooster.address));

    await test_util.sleep("120");
    //await test_util.updateABI(contractName)
    await test_util.verify(FarmBooster.address, contractName, [SFYX, cakePool, MasterChefV2, max, cA, cB])

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


