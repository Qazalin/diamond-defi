/** Deploys contract A and Diamond */

import { deployDiamodCut } from "../deployNewFacet";
import { deployDiamond } from "../deployDiamond";

async function deployA() {
  const diamond = await deployDiamond();
  const cut = await deployDiamodCut("A");
}

deployA();
