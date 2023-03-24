

import { saveContractAddress, deploy } from './util'

async function main() {

    // DEPLOY SFY
    const verifyContracts = false;
    let contractName = "SFY"
    let contract = await deploy(verifyContracts, contractName)
    saveContractAddress(contractName, contract.address)

    // DEPLOY SFYX
    contractName = "SFYX"
    contract = await deploy(verifyContracts, contractName)
    saveContractAddress(contractName, contract.address)
}


main().catch((error: Error) => {
    console.error(error)
    process.exitCode = 1
})


