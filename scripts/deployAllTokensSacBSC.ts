
import { ethers } from 'hardhat'
import { formatEther, parseEther } from 'ethers/lib/utils';
import test_util from './util'
import { Contract } from 'ethers';
const colors = require('colors/safe');



const deployedTokens = [];
let to = ""

async function main() {



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

    to = deployer.address;

    // 1 CAKE
    let name = "CAKE";
    let symbol = "CAKE";
    await deploy(name, symbol, "117000000000000");

    // 2 LINK
    name = "LINK";
    symbol = "LINK";
    await deploy(name, symbol, "117000000000000");

    // 2 DAI
    name = "DAI";
    symbol = "DAI";
    await deploy(name, symbol, "117000000000000");

    // 2 USDT
    name = "USDT";
    symbol = "USDT";
    await deploy(name, symbol, "117000000000000");

    // 2 BUSD
    name = "BUSD";
    symbol = "BUSD";
    await deploy(name, symbol, "117000000000000");

    // 2 USDC
    name = "USDC";
    symbol = "USDC";
    await deploy(name, symbol, "117000000000000");

    // 2 ZIL
    name = "ZIL";
    symbol = "ZIL";
    await deploy(name, symbol, "117000000000000");

    // 2 ZIL
    name = "MATIC";
    symbol = "MATIC";
    await deploy(name, symbol, "117000000000000");

    // 2 ZIL
    name = "UNI";
    symbol = "UNI";
    await deploy(name, symbol, "117000000000000");




    return true;
}

async function deploy(name: string, symbol: string, supply: string) {
    let _name = name;
    let _symbol = symbol;
    let contractName = "Token"
    const contractFactory = await ethers.getContractFactory(contractName);
    const token = await contractFactory.deploy(_name, _symbol, parseEther(supply), to);
    console.log(colors.cyan(name + " Address: ") + colors.yellow(token.address));
    deployedTokens.push(token.address);

    await test_util.sleep("15");
    //await test_util.verify(Token.address, contractName, [_name, _symbol])
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


