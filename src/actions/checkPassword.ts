import { setError } from "../state/error";
import { setStage } from "../state/stage";
import { runAction } from "../util/runAction";
import { client } from "./initClient";

export async function checkPassword(password: string) {
  await runAction(async () => {
    const result = await client.checkPassword(password);

    switch (result.type) {
      case "invalid_password":
        setError("The password you entered is invalid.");
        break;
      case "signed_in":
        const authString = await client.exportAuthString();
        setStage({
          kind: "signed_in",
          authString,
          me: await client.getMe(),
        });
    }
  });
}
