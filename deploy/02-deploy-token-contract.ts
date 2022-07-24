import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../helper-functions"
import { developmentChains } from "../helper-hardhat-config"

const deployJToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    // @ts-ignore
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("Deploying JToken contract and waiting for confirmations...")
    const jToken = await deploy("JToken", {
        from: deployer,
        args: ["JToken", "JTOK", 1000000],
        log: true,
        // we need to wait if on a live network so we can verify properly
        // waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    })
    log(`JToken at ${jToken.address}`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(jToken.address, [])
    }
}

export default deployJToken
deployJToken.tags = ["all", "token"]
