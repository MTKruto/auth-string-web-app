import { createEffect, createSignal } from "solid-js";
import { initClient } from "../actions/initClient";
import { isBusy } from "../state/isBusy";

const API_ID = "apiId";
const API_HASH = "apiHash";

export function ApiCredentialsForm() {
  const [apiId, setApiId] = createSignal(localStorage.getItem(API_ID) ?? "");
  const [apiHash, setApiHash] = createSignal(localStorage.getItem(API_HASH) ?? "");

  createEffect(() => {
    localStorage.setItem(API_ID, apiId());
    localStorage.setItem(API_HASH, apiHash());
  });

  return (
    <form
      class="form"
      onsubmit={async (e) => {
        e.preventDefault();

        const apiIdNumber = Number(apiId());
        if (isNaN(apiIdNumber) || apiIdNumber < 1) {
          return;
        }

        initClient(apiIdNumber, apiHash());
      }}
    >
      <input
        disabled={isBusy()}
        type="text"
        value={apiId()}
        onInput={(e) => setApiId(e.target.value)}
        placeholder="API ID"
        pattern="^[1-9][0-9]*$"
        required
        autocomplete="off"
      />
      <input
        disabled={isBusy()}
        type="password"
        value={apiHash()}
        onInput={(e) => setApiHash(e.target.value)}
        placeholder="API hash"
        pattern="^[a-f0-9]+$"
        required
        autocomplete="off"
      />
      <button type="submit" disabled={isBusy()} class="primary">Next</button>

      <p>
        These credentials can be obtained from{" "}
        <a href="https://my.telegram.org/apps" rel="noopener noreferrer" target="_blank">my.telegram.org/apps</a>.
      </p>
    </form>
  );
}
