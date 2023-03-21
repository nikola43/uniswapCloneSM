
import { ethers } from 'hardhat'
import { formatEther } from 'ethers/lib/utils';
import test_util from './util'
import { Contract } from 'ethers';
const colors = require('colors/safe');
async function main() {

    let PLSXBuyAndBurnV3: Contract;
    const WETH = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"
    const factoryAddress = "0x348ED784BB223F49DF3C7bC7EAC7139095dfF08e"
    const SFYXAddress = "0x4a364546B6765a3469ab131b96ddEbe4A2199082"
    const SFYAddress = "0xefc5bAE08de485DA4D4425B2Ad4adf44FF2F3844"

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

    let contractName = "PLSXBuyAndBurnV3"
    const contractFactory = await ethers.getContractFactory(contractName);
    PLSXBuyAndBurnV3 = await contractFactory.deploy(factoryAddress, SFYAddress, SFYXAddress, WETH);

    console.log(colors.cyan("PLSXBuyAndBurnV3 Address: ") + colors.yellow(PLSXBuyAndBurnV3.address));

    await test_util.sleep("360");
    //await test_util.updateABI(contractName)
    await test_util.verify(PLSXBuyAndBurnV3.address, contractName, [factoryAddress, SFYAddress, SFYXAddress, WETH])
    await test_util.sleep("5");
    await PLSXBuyAndBurnV3.setAnyAuth();

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


