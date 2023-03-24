

import { saveContractAddress, deploy } from './util'

async function main() {


    const verifyContracts = false;
    const factoryAddress = "0xF46322b82780D018532C2F7F9eA232BF34777DBa"
    const WETH = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"

    // DEPLOY SwapifyFactory
    const contractName = "SwapifyRouter"
    const contract = await deploy(verifyContracts, contractName, factoryAddress, WETH)
    saveContractAddress(contractName, contract.address)

}


main().catch((error: Error) => {
    console.error(error)
    process.exitCode = 1
})






