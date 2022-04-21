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
  /* await addNewFacet(DIAMOND_ADDR, testConfig);
  const testContract = await ethers.getContractAt("Test", DIAMOND_ADDR);
  console.log(await testContract.getA());
  await testContract.setA(45);
  console.log(await testContract.getA());
  console.log("replacing the contract...");
  const newContract = await deployDiamodCut("Test2");
  console.log("Deployed new contract: ", newContract);
  await cutAction("replace", newContract, DIAMOND_ADDR);
  console.log("replaced"); */
  const newContract = await ethers.getContractAt("Test2", DIAMOND_ADDR);
  console.log("A is: ", await newContract.getA());
  console.log("Setting a with arg: 2", await newContract.setA(2));
  console.log("A is: ", await newContract.getA());
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
