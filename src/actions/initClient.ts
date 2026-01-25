import { ClientDispatcher, ClientWorker } from "@mtkruto/mtkruto";
import Worker from "@mtkruto/mtkruto/worker?worker";
import { setConnectionState } from "../state/connectionState";
import { isTabOpen } from "../state/isTabOpen";
import { setStage } from "../state/stage";
import { runAction } from "../util/runAction";

const clientWorker = new ClientWorker(new Worker());

export let client: ClientDispatcher;

export async function initClient(apiId: number, apiHash: string) {
  await runAction(() => initClientInner(apiId, apiHash));
}

async function initClientInner(apiId: number, apiHash: string) {
  if (isTabOpen) {
    return;
  }

  client = await clientWorker.createClient({
    storage: "indexeddb",
    apiId,
    apiHash,
  });

  await client.connect();

  try {
    const me = await client.getMe();
    const authString = await client.exportAuthString();
    setStage({
      kind: "signed_in",
      authString,
      me,
    });
  } catch (err) {
    setStage({ kind: "phone_number_or_bot_token" });
  } finally {
    setConnectionState("ready");
  }
}
