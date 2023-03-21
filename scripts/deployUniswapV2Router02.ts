
import { ethers } from 'hardhat'
import { formatEther } from 'ethers/lib/utils';
import test_util from './util'
import { Contract } from 'ethers';
const colors = require('colors/safe');
async function main() {

    let uniswapV2Router02: Contract;
    const factoryAddress = "0x98c63E02E729e53639c044F377Ad4E11C85F7703"
    const WETH = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"

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

    let contractName = "UniswapV2Router02"
    const contractFactory = await ethers.getContractFactory(contractName);
    uniswapV2Router02 = await contractFactory.deploy(factoryAddress, WETH);

    console.log(colors.cyan("UniswapV2Router02 Address: ") + colors.yellow(uniswapV2Router02.address));

    await test_util.sleep("120");
    //await test_util.updateABI(contractName)
    await test_util.verify(uniswapV2Router02.address, contractName, [factoryAddress, WETH])


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


