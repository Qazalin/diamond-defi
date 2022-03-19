import { Contract } from "ethers";
import { getSelectors, FacetCutAction } from "../libraries/diamond.js";
import { ethers } from "hardhat";

import { ActionType } from "../libraries/types";

export async function cutAction(
  action: ActionType,
  contract: Contract,
  diamondAddr: string
) {
  // deployment configuration
  const cut = [];
  let act: any;
  switch (action) {
    case "add":
      act = FacetCutAction.Add;
    case "remove":
      act = FacetCutAction.Remove;
    case "replace":
      act = FacetCutAction.Replace;
    default:
      act = FacetCutAction.Add;
  }

  cut.push({
    facetAddress: contract.address,
    action: act,
    functionSelectors: getSelectors(contract),
  });

  console.log(`action: ${action} done to ${contract.address}`);

  // TO-DO: make a utility function that does this automagically if we don't provide any args
  const diamondCut = await ethers.getContractAt("IDiamondCut", diamondAddr);
  const tx = await diamondCut.diamondCut(
    cut,
    "0x0000000000000000000000000000000000000000",
    []
  );
  console.log("Diamond cut tx: ", tx.hash);
  let receipt: any;
  receipt = await tx.wait();

  if (!receipt.status) {
    throw Error(`Diamond upgrade failed: ${tx.hash}`);
  }
  console.log("Completed diamond cut");
}
