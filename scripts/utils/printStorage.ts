import { Contract } from "ethers";
import { ethers } from "hardhat";
import { deployDiamodCut } from "./deployNewFacet";

/**
 * Prints the storage slots of a contract
 * @async
 * @param contract the contract object
 * @param name
 * @param count the number of storage slots
 */
async function printStorage(contract: Contract, name: string, count: number) {
  for (let i = 0; i < count; i++) {
    console.log(
      name,
      i,
      await ethers.provider.getStorageAt(contract.address, i)
    );
  }
}
async function deployTest(contract: Contract) {
  const store1 = await contract.getStorage1();
  const store2 = await contract.getStorage2();
  console.log("the result of kaccak is: ", store1);
  console.log("the result of kaccak is: ", store2);

  await printStorage(contract, "Test", 3);
}

deployDiamodCut("Test").then(deployTest);
