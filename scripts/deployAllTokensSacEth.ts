
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

    // 1 __MAXI
    let name = "__MAXI";
    let symbol = "__MAXI";
    await deploy(name, symbol, "117000000000000");

    // 2 USDC
    name = "USDC";
    symbol = "USDC";
    await deploy(name, symbol, "117000000000000");

    // 3 CRO
    name = "CRO";
    symbol = "CRO";
    await deploy(name, symbol, "117000000000000");

    // 4 SHIB
    name = "SHIB";
    symbol = "SHIB";
    await deploy(name, symbol, "117000000000000");

    // 5 MATIC
    name = "MATIC";
    symbol = "MATIC";
    await deploy(name, symbol, "117000000000000");

    // 6 DAI
    name = "DAI";
    symbol = "DAI";
    await deploy(name, symbol, "117000000000000");

    // 7 USDT
    name = "USDT";
    symbol = "USDT";
    await deploy(name, symbol, "117000000000000");

    // 8 LINK
    name = "LINK";
    symbol = "LINK";
    await deploy(name, symbol, "117000000000000");

    // 9 BUSD
    name = "BUSD";
    symbol = "BUSD";
    await deploy(name, symbol, "117000000000000");

    // 10 FTM
    name = "FTM";
    symbol = "FTM";
    await deploy(name, symbol, "117000000000000");

    // 11 HDRN
    name = "HDRN";
    symbol = "HDRN";
    await deploy(name, symbol, "117000000000000");

    // 12 HDRN
    name = "PLSD";
    symbol = "PLSD";
    await deploy(name, symbol, "117000000000000");

    // 13 HEX
    name = "HEX";
    symbol = "HEX";
    await deploy(name, symbol, "117000000000000");

    // 14 WBTC
    name = "WBTC";
    symbol = "WBTC";
    await deploy(name, symbol, "117000000000000");

    // 14 UNI
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


