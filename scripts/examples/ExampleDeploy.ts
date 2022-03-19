/** Deploys contract A and Diamond */

import { deployDiamodCut } from "../utils/deployNewFacet";
import { deployDiamond } from "../utils/deployDiamond";

async function deployA() {
  const diamond = await deployDiamond();
  const cut = await deployDiamodCut("A");
}

deployA();
