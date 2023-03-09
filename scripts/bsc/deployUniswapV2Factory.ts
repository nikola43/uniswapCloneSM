
import { ethers } from 'hardhat'
import { formatEther } from 'ethers/lib/utils';
import test_util from '../util'
import { Contract } from 'ethers';
const colors = require('colors/safe');
async function main() {

    let uniswapV2Factory: Contract;


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

    const _feeToSetter = deployer.address;

    let contractName = "UniswapV2Factory"
    const contractFactory = await ethers.getContractFactory(contractName);
    uniswapV2Factory = await contractFactory.deploy(_feeToSetter);

    console.log(colors.cyan("UniswapV2Factory Address: ") + colors.yellow(uniswapV2Factory.address));

    await test_util.sleep("120");
    //await test_util.updateABI(contractName)
    await test_util.verify(uniswapV2Factory.address, contractName, [_feeToSetter])
    console.log(colors.cyan("INIT_CODE_PAIR_HASH: ") + colors.yellow(await uniswapV2Factory.INIT_CODE_PAIR_HASH()));


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


