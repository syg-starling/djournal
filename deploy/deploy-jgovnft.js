// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
require('dotenv').config({ path: '../.env' })
const { ethers, upgrades } = require('hardhat')

const contractRolesAddr = process.env.CONTRACT_ROLES_ADDR

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log("Deploying contracts with the account:", deployer.address)

  const deployerBalance = (await deployer.getBalance()).toString()
  console.log("Account balance:", deployerBalance)

  if (deployerBalance === '0') return // deployment will fail

  const JGovNFT = await ethers.getContractFactory('JGovNFT')
  const contract = await upgrades.deployProxy(JGovNFT, [
    "JGovNFT", 
    "JNFT", 
    "1",
    contractRolesAddr,
  ])
  await contract.deployed()

  console.log('JGovNFT deployed to:', contract.address)
  console.log('JGovNFT details:', contract)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
