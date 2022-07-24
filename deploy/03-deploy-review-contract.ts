import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../helper-functions"
import { developmentChains } from "../helper-hardhat-config"

const deployJReview: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    // @ts-ignore
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()
    const jGovNFT = await get("JGovNFT")
    const jToken = await get("JToken")
    log("Deploying JReview contract and waiting for confirmations...")
    const jReview = await deploy("JReview", {
        from: deployer,
        args: [jGovNFT.address, jToken.address],
        log: true,
        // we need to wait if on a live network so we can verify properly
        // waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    })
    log(`JReview at ${jReview.address}`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(jReview.address, [])
    }
}

export default deployJReview
deployJReview.tags = ["all", "review"]
