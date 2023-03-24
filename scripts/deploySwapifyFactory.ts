

import { saveContractAddress, deploy, getDeployer, execShellCommand } from './util'

async function main() {
    const deployer = await getDeployer();

    const verifyContracts = false;

    // DEPLOY SwapifyFactory
    const contractName = "SwapifyFactory"
    const _feeToSetter = deployer.address;
    const contract = await deploy(verifyContracts, contractName, _feeToSetter)
    saveContractAddress(contractName, contract.address)
    let INIT_CODE_PAIR_HASH = await contract.INIT_CODE_PAIR_HASH();
    saveContractAddress("INIT_CODE_PAIR_HASH", INIT_CODE_PAIR_HASH);
}


main().catch((error: Error) => {
    console.error(error)
    process.exitCode = 1
})


