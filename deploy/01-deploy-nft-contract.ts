import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../helper-functions"
import { developmentChains } from "../helper-hardhat-config"

const deployJGovNFT: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    // @ts-ignore
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("Deploying JGovNFT contract and waiting for confirmations...")
    const jGovNFT = await deploy("JGovNFT", {
        from: deployer,
        args: ["JGovNFT", "JNFT", "1"],
        log: true,
        // we need to wait if on a live network so we can verify properly
        // waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    })
    log(`JGovNFT at ${jGovNFT.address}`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(jGovNFT.address, [])
    }
}

export default deployJGovNFT
deployJGovNFT.tags = ["all", "nft"]
