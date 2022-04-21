/* eslint no-process-exit: "off" */
import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";
import {
  deployDiamodCut,
  deployDiamond,
  addNewFacet,
  cutAction,
} from "../utils";
import { DIAMOND_ADDR } from "../libraries/constants";
import { deployConfigType } from "../libraries/types";

const testConfig: deployConfigType = {
  names: ["Test"],
  actions: ["add"],
};

async function main() {
  // await deployDiamond();
  // await deployDiamodCut("Test");
  // await addNewFacet(DIAMOND_ADDR, testConfig);
  const testContract = await ethers.getContractAt("Test", DIAMOND_ADDR);
  console.log(await testContract.getA());
  await testContract.setA(45);
  console.log(await testContract.getA());
  console.log("Removing the contract...");
  await cutAction("remove", testContract, DIAMOND_ADDR);
  console.log("Removed");
  console.log(await testContract.getA());
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
