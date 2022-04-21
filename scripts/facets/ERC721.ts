/* eslint no-process-exit: "off" */
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
async function initERC721() {
  const e721 = await ethers.getContractAt("IERC721Metadata", DIAMOND_ADDR);
  const tx = await e721.initialize("NFT", "FT", "35205820842084010");
  await tx.wait();
  console.log("Initialization of ERC721 completed");
  console.log("---------------------------");
  // @ts-ignore
  console.log(`The token's base URI is: ${await e721._baseURI()}`);
}

async function mintNFT() {
  const nft = await ethers.getContractAt("IERC721", DIAMOND_ADDR);
  console.log(await nft.mint());
}

async function main() {
  // await deployDiamond();
  // await deployDiamodCut("ERC721")
  await addNewFacet(DIAMOND_ADDR, e721Config);
  await initERC721();
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
