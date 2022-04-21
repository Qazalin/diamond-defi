import { Contract } from "ethers";
import { getSelectors, FacetCutAction } from "../libraries/diamond.js";
import { ethers } from "hardhat";

import { ActionType, CutActionType } from "../libraries/types";
import { ADDRESS_ZERO } from "@diamond/libraries/constants.js";

/**
 * Diamond cut actions on the contract => Replace, Add, Remove
 * @async
 * @param contract the deployed contract object
 * @param action See ActionType
 * @param diamondAddr
 */
export async function cutAction(
  action: ActionType,
  contract: Contract,
  diamondAddr: string
) {
  // deployment configuration
  const cut: CutActionType[] = [];
  let act: number;
  switch (action) {
    case "add":
      act = FacetCutAction.Add;
      break;
    case "remove":
      act = FacetCutAction.Remove;
      break;
    case "replace":
      act = FacetCutAction.Replace;
      break;
    default:
      act = FacetCutAction.Add;
  }

  cut.push({
    facetAddress: act === 2 ? ADDRESS_ZERO : contract.address, // Remove facetAddress shoul be zero
    action: act,
    functionSelectors: getSelectors(contract),
  });

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
