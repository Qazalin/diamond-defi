/**
 * Deploys a list of contracts [A, B, C]
 */
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { deployConfigType } from "../libraries/types";
import { cutAction } from "../utils/cutAction";
import { deployDiamodCut } from "../utils/deployNewFacet";
import { deployDiamond } from "../utils/deployDiamond";

const deployConfig: deployConfigType = {
  names: ["A", "B", "C"],
  actions: ["add", "add", "add"],
};

async function deployA(diamond: Contract) {
  for (let i = 0; i < deployConfig.names.length; i++) {
    const cut = await deployDiamodCut(deployConfig.names[i]);
    console.log("----------------------------------");
  }
  console.log("deployment of all completed");
}

deployDiamond().then(deployA);

async function doSomething() {
  const diamondAddr = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const a = await ethers.getContractAt("IA", diamondAddr);
  console.log("a: ", await a.getA());
  console.log("------------------");

  const b = await ethers.getContractAt("IB", diamondAddr);
  console.log("b: ", await b.getB());
  console.log("------------------");

  const c = await ethers.getContractAt("IC", diamondAddr);
  console.log("c: ", await c.getC());
  console.log("------------------");
}

// doSomething();
