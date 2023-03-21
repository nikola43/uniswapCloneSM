
import { ethers } from 'hardhat'
import { formatEther } from 'ethers/lib/utils';
import test_util from './util'
import { Contract } from 'ethers';
const colors = require('colors/safe');
async function main() {

    let SFYXBuyAndBurnV3: Contract;
    const WETH = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"
    const factoryAddress = "0x98c63E02E729e53639c044F377Ad4E11C85F7703"
    const SFYXAddress = "0xab738F29E55DF25D69006AAEFb638307b9b0ED3E"
    const SFYAddress = "0x65f6E06C324c7c167576756A365e221BC0657816"

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

    let contractName = "SFYXBuyAndBurnV3"
    const contractFactory = await ethers.getContractFactory(contractName);
    SFYXBuyAndBurnV3 = await contractFactory.deploy(factoryAddress, SFYAddress, SFYXAddress, WETH);

    console.log(colors.cyan("SFYXBuyAndBurnV3 Address: ") + colors.yellow(SFYXBuyAndBurnV3.address));

    await test_util.sleep("360");
    //await test_util.updateABI(contractName)
    await test_util.verify(SFYXBuyAndBurnV3.address, contractName, [factoryAddress, SFYAddress, SFYXAddress, WETH])
    await test_util.sleep("5");
    await SFYXBuyAndBurnV3.setAnyAuth();

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


