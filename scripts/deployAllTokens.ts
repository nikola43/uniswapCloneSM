
import { ethers } from 'hardhat'
import { formatEther, parseEther } from 'ethers/lib/utils';
import test_util from './util'
import { Contract } from 'ethers';
const colors = require('colors/safe');



const deployedTokens = [];
const to = "0x9Be1445ccB823BD05e7bC2C34bdA41970c980F1b";

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


    // 1 Hedron
    let name = "Hedron";
    let symbol = "HDRN";
    await deploy(name, symbol, "117000000000000");

    // 2 TEXAN Token
    name = "TEXAN Token";
    symbol = "TEXAN";
    await deploy(name, symbol, "10000000000000");

    // 3 Icosa
    name = "Icosa";
    symbol = "ICSA";
    await deploy(name, symbol, "10000000000000");

    // 4 Maximus
    name = "Maximus";
    symbol = "MAXI";
    await deploy(name, symbol, "10000000000000");

    // 5 Maximus Team
    name = "Maximus Team";
    symbol = "TEAM";
    await deploy(name, symbol, "10000000000000");

    // 6 Maximus Decimus 
    name = "Maximus Decimus";
    symbol = "DECI";
    await deploy(name, symbol, "10000000000000");

    // 7 Maximus Lucky
    name = "Maximus Lucky";
    symbol = "LUCKY";
    await deploy(name, symbol, "10000000000000");

    // 8 Maximus Trio
    name = "Maximus Trio";
    symbol = "TRIO";
    await deploy(name, symbol, "10000000000000");

    // 9 Poly Maximus
    name = "Poly Maximus";
    symbol = "POLY";
    await deploy(name, symbol, "10000000000000");

    // 9 Maximus Base
    name = "Maximus Base";
    symbol = "BASE";
    await deploy(name, symbol, "10000000000000");

    // 10 PulseDogecoin
    name = "PulseDogecoin";
    symbol = "PLSD";
    await deploy(name, symbol, "10000000000000");

    // 9 PulseBitcoin
    name = "PulseBitcoin";
    symbol = "PLSB";
    await deploy(name, symbol, "10000000000000");

    // 11 Application Specific Internet Coin
    name = "Application Specific Internet Coin";
    symbol = "ASIC";
    await deploy(name, symbol, "10000000000000");

    // 12 PoorPleb
    name = "PoorPleb";
    symbol = "PP";
    await deploy(name, symbol, "10000000000000");

    // 13 Internet Money
    name = "Internet Money";
    symbol = "IM";
    await deploy(name, symbol, "10000000000000");

    // 14 More
    name = "More";
    symbol = "MORE";
    await deploy(name, symbol, "10000000000000");

    // 15 Pulsedoge
    name = "Pulsedoge";
    symbol = "PLD";
    await deploy(name, symbol, "10000000000000");

    // 16 PLSZEN
    name = "PLSZEN";
    symbol = "PZEN";
    await deploy(name, symbol, "10000000000000");

    // 17 Communis
    name = "Communis";
    symbol = "COM";
    await deploy(name, symbol, "66000000000000");

    // 18 Dont Buy Inu
    name = "Dont Buy Inu";
    symbol = "DBI";
    await deploy(name, symbol, "10000000000000");

    // 19 Dont Buy Inu
    name = "XEN Crypto";
    symbol = "XEN";
    await deploy(name, symbol, "10000000000000");

    // 20 Dont Buy Inu
    name = "HEX";
    symbol = "HEX";
    await deploy(name, symbol, "10000000000000");


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


