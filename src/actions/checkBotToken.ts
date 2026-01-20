import { setStage } from "../state/stage";
import { runAction } from "../util/runAction";
import { client } from "./initClient";

export async function checkBotToken(botToken: string) {
  await runAction(async () => {
    await client.checkBotToken(botToken);
    const authString = await client.exportAuthString();
    setStage({ kind: "signed_in", authString, me: await client.getMe() });
  });
}
