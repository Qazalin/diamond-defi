// scripts/facets/ERC20.ts
// Step1:  Deploys a new ERC20 token and adds it to the diamond
// Step2: Initialize the ERC20 token through the diamond storage
// Step3: Interaction with the ERC20 contract

import { addNewFacet } from "../utils";
import { DIAMOND_ADDR } from "../libraries/constants";
import { deployConfigType } from "../libraries/types";
import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

// Step 1:
const e20Config: deployConfigType = {
  names: ["ERC20"],
  actions: ["add"],
};

async function initERC20() {
  const e20 = await ethers.getContractAt("IERC20", DIAMOND_ADDR);
  const tx = await e20.initialize(1000, "Token", "TKN");
  await tx.wait();
  console.log("Initialization of ERC20 completed");
  console.log("---------------------------");
  console.log(`The token's total supply is: ${await e20.totalSupply()}`);
}

// addNewFacet(DIAMOND_ADDR, e20Config).then(() => initERC20());
initERC20();
