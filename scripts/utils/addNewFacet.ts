import { cutAction } from "../utils/cutAction";
import { Contract } from "ethers";
import { deployConfigType } from "../libraries/types";
import { deployDiamodCut } from "./deployNewFacet";

/**
 * Deploys a new contract and adds it to the Diamond
 * @param diamondAddr the deployed diamond address
 * @param deployConfig deployment configuration "See libraries/types"
 */
export async function addNewFacet(
  diamondAddr: string,
  deployConfig: deployConfigType
) {
  for (let i = 0; i < deployConfig.names.length; i++) {
    const cut = await deployDiamodCut(deployConfig.names[i]);
    console.log(`deployed contract ${deployConfig.names[i]}`);
    await cutAction(deployConfig.actions[i], cut, diamondAddr);
    console.log(`added contract ${deployConfig.names[i]} to The Diamond`);
    console.log("----------------------------------");
  }
  console.log("All contracts have been added💎");
}
