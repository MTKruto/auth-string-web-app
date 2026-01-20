import { setStage } from "../state/stage";
import { runAction } from "../util/runAction";
import { client } from "./initClient";

export async function sendCode(phoneNumber: string) {
  await runAction(async () => {
    await client.sendCode(phoneNumber);
    setStage({ kind: "phone_code" });
  });
}
