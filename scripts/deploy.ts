import { address, toNano } from "@ton/core";
import { MainContract } from "../wrappers/MainContract";
import { compile, NetworkProvider } from "@ton/blueprint";

export async function run(provider: NetworkProvider) {
  const codeCell = await compile("MainContract");
  const myContract = MainContract.createFromConfig(
    {
      number: 0,
      address: address("EQDp5CTd1FkTmN0dS6pd9ZfpPDm4jWyoP_iRsojxhBisdtlp"),
      ownerAddress: address("EQDp5CTd1FkTmN0dS6pd9ZfpPDm4jWyoP_iRsojxhBisdtlp"),
    },
    codeCell,
  );

  const openedContract = provider.open(myContract);

  openedContract.sendDeploy(provider.sender(), toNano("0.05"));

  await provider.waitForDeploy(myContract.address);
}
