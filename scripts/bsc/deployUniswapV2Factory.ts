
import { ethers } from 'hardhat'
import { formatEther } from 'ethers/lib/utils';
import test_util from '../util'
import { Contract } from 'ethers';
const colors = require('colors/safe');
async function main() {

    let uniswapV2Factory: Contract;
    const _feeToSetter = "0x9F3254c555c2849bE40F5f22ef9F3b846a62a8EA"

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

    let contractName = "UniswapV2Factory"
    const contractFactory = await ethers.getContractFactory(contractName);
    uniswapV2Factory = await contractFactory.deploy(_feeToSetter);

    console.log(colors.cyan("UniswapV2Factory Address: ") + colors.yellow(uniswapV2Factory.address));
    console.log(colors.cyan("INIT_CODE_PAIR_HASH: ") + colors.yellow(await uniswapV2Factory.INIT_CODE_PAIR_HASH()));

    await test_util.sleep("60");
    //await test_util.updateABI(contractName)
    await test_util.verify(uniswapV2Factory.address, contractName, [_feeToSetter])

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


