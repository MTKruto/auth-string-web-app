import { ClientDispatcher, ClientWorker, errors } from "@mtkruto/mtkruto";
import SharedWorker from "@mtkruto/mtkruto/worker?sharedworker";
import { setConnectionState } from "../state/connectionState";
import { setStage } from "../state/stage";
import { runAction } from "../util/runAction";

const port = new SharedWorker().port;
port.start();

const clientWorker = new ClientWorker(port);

export let client: ClientDispatcher;

export async function initClient(apiId: number, apiHash: string) {
  await runAction(() => initClientInner(apiId, apiHash));
}

async function initClientInner(apiId: number, apiHash: string) {
  try {
    client = await clientWorker.createClient("main", {
      storage: "indexeddb",
      apiId,
      apiHash,
    });
  } catch (err) {
    if (err instanceof errors.InputError) {
      client = clientWorker.getClient("main");
    } else {
      throw err;
    }
  }

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
