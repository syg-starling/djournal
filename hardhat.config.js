const fs = require('fs')
const fsExtra = require('fs-extra')
const { subtask, task } = require('hardhat/config')
const { TASK_CLEAN } = require('hardhat/builtin-tasks/task-names')
require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-ethers')
require('hardhat-deploy')
require('hardhat-contract-sizer')
require('@openzeppelin/hardhat-upgrades')

require('dotenv').config()

let mnemonic = process.env.MNEMONIC
if (!mnemonic) {
  mnemonic = 'test test test test test test test test test test test junk'
}
const mnemonicAccounts = {
  mnemonic,
}

const account = {
  Localnet: process.env.LOCALNET_PRIVATE_KEY,
  Testnet: process.env.TESTNET_PRIVATE_KEY,
  Mainnet: process.env.MAINNET_PRIVATE_KEY,
}

// Default output dir to abi contracts in frontend
const contractsFrontDir = './packages/contract/abi'

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config = {
  solidity: {
    version: '0.8.2',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: 'localnet',
  networks: {
    hardhat: {
      accounts: mnemonicAccounts,
    },
    harmony: {
      // url: "https://api.s0.t.hmny.io",
      url: "https://harmony-0-rpc.gateway.pokt.network",
      accounts: [account.Mainnet],
    },
    localnet: {
      live: false,
      url: 'http://localhost:8545',
      chainId: 1666700000,
      accounts: account.Localnet ? [account.Localnet] : mnemonicAccounts,
    },
    testnet: {
      url: 'https://matic-mumbai.chainstacklabs.com/',
      chainId: 80001,
      accounts: account.Testnet ? [account.Testnet] : mnemonicAccounts,
    },
    mainnet: {
      url: 'https://api.s0.t.hmny.io',
      chainId: 1666600000,
      accounts: account.Mainnet ? [account.Mainnet] : mnemonicAccounts,
      live: true,
      saveDeployments: true,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
  mocha: {
    timeout: 50000, // 50 seconds timeout
  },
}

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

task(TASK_CLEAN, 'Clean all artifacts & folder contracts in frontend').setAction(async (taskArgs, hre, runSuper) => {
  await runSuper()
  if (fs.existsSync('./deployments')) {
    fs.rmdirSync('./deployments', { recursive: true })
  }
  await hre.run('clean-front-contracts')
})


subtask('clean-front-contracts', 'Clear frontend contracts folder').setAction(async () => {
  // Clear if exist
  if (fs.existsSync(contractsFrontDir)) {
    fsExtra.emptyDirSync(contractsFrontDir)
  }
})

task('deploy', 'Deploy contracts').setAction(async (taskArgs, hre, runSuper) => {
  if (!fs.existsSync(contractsFrontDir)) {
    fs.mkdirSync(contractsFrontDir, { recursive: true })
  }
  await runSuper(taskArgs)
})

module.exports = config
