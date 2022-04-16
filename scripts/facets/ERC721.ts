import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";
import { deployDiamodCut, deployDiamond, addNewFacet } from "../utils";
import { DIAMOND_ADDR } from "../libraries/constants";
import { deployConfigType } from "../libraries/types";

const e721Config: deployConfigType = {
  names: ["ERC721"],
  actions: ["add"],
};
/**
 * adds the erc721 contract to the diamond
 */
async function deployErc721() {
  const diamond = await deployDiamond();
  const cut = await deployDiamodCut("ERC721");
}

async function initERC721() {
  const e721 = await ethers.getContractAt("IERC721Metadata", DIAMOND_ADDR);
  const tx = await e721.initialize("NFT", "FT", "35205820842084010");
  await tx.wait();
  console.log("Initialization of ERC721 completed");
  console.log("---------------------------");
  // @ts-ignore
  console.log(`The token's base URI is: ${await e721._baseURI()}`);
}

// deployErc721();
addNewFacet(DIAMOND_ADDR, e721Config).then(() => initERC721());
