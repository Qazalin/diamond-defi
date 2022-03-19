import { ethers } from "hardhat";

/* Deploys the new dimamond cut contract */
export async function deployDiamodCut(name: string) {
  const Contract = await ethers.getContractFactory(name);
  const contract = await Contract.deploy();
  await contract.deployed();
  console.log(`✨${name} deployed to: `, contract.address);
  return contract;
}
