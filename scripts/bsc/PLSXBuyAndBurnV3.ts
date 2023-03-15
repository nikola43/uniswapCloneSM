
import { ethers } from 'hardhat'
import { formatEther } from 'ethers/lib/utils';
import test_util from '../util'
import { Contract } from 'ethers';
const colors = require('colors/safe');
async function main() {

    let PLSXBuyAndBurnV3: Contract;
    const WETH = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"
    const factoryAddress = "0x348ED784BB223F49DF3C7bC7EAC7139095dfF08e"
    const SFY_ETHAddress = "0x38fE5F2caF0176DEF63480540c8063d1D3586dBd";
    const SFYX_ETHAddress = "0x70b73AC3C37ffAAdD173eFBDfddd0b1E8FA7829B";
    const SFY_SFYXAddress = "0xCF029830b9fFf03Af6E833C216678CEc883A51e7";
    const SFYXAddress = "0x4a364546B6765a3469ab131b96ddEbe4A2199082"

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
    PLSXBuyAndBurnV3 = await contractFactory.deploy(factoryAddress, SFYXAddress, WETH);

    console.log(colors.cyan("PLSXBuyAndBurnV3 Address: ") + colors.yellow(PLSXBuyAndBurnV3.address));

    await test_util.sleep("60");
    //await test_util.updateABI(contractName)
    await test_util.verify(PLSXBuyAndBurnV3.address, contractName, [factoryAddress, SFYXAddress, WETH])

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


