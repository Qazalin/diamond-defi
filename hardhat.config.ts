import * as dotenv from "dotenv";

import { HardhatUserConfig, task, types } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import _ from "underscore";

dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
task("deploy-diamond", "Deploys the main diamond contract").setAction(
  async (_, { ethers }) => {
    const accounts = await ethers.getSigners();
    const contractOwner = accounts[0];

    // deploy DiamondCutFacet
    const DiamondCutFacet = await ethers.getContractFactory("DiamondCutFacet");
    const diamondCutFacet = await DiamondCutFacet.deploy();
    await diamondCutFacet.deployed();
    console.log("DiamondCutFacet deployed:", diamondCutFacet.address);

    // deploy Diamond
    const Diamond = await ethers.getContractFactory("Diamond");
    const diamond = await Diamond.deploy(
      contractOwner.address,
      diamondCutFacet.address
    );
    await diamond.deployed();
    console.log("Diamond deployed:", diamond.address);
    console.log("💎------------------------💎");
  }
);

task("deploy-facet", "Deploys a diamond facet")
  .addParam("name", "the name of the contract", _, types.string)
  .addParam("diamondAddr", "the address of the diamond", _, types.string)
  .setAction(async (taskArgs, { ethers }) => {
    const Contract = await ethers.getContractFactory(taskArgs.name);
    // @ts-ignore
    const contract = await Contract.deploy();
    await contract.deployed();
    console.log(`✨${taskArgs.name} deployed to: `, contract.address);
  });

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  defaultNetwork: "localhost",
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
