import { setError } from "../state/error";
import { setStage } from "../state/stage";
import { runAction } from "../util/runAction";
import { client } from "./initClient";

export async function checkCode(verificationCode: string) {
  await runAction(async () => {
    const result = await client.checkCode(verificationCode);

    switch (result.type) {
      case "password_required":
        setStage({
          kind: "password",
          hint: await client.getPasswordHint(),
        });
        break;
      case "invalid_code":
        setError("The code you entered is invalid.");
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
