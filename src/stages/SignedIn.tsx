import { createSignal } from "solid-js";
import { setStage, type Stage, stage } from "../state/stage";
import "./SignedIn.css";
import { client } from "../actions/initClient";

const COPY = "Copy";

export function SignedIn() {
  const stage_ = stage() as Stage.SignedIn;
  const authString = stage_.authString;
  const me = stage_.me;

  const [buttonText, setButtonText] = createSignal(COPY);

  return (
    <div class="auth-string-container">
      <div>Signed in as the {me.isBot ? "bot" : "user"} {me.id} {me.username ? `(@${me.username})` : ""}</div>
      <div class="auth-string">{authString}</div>
      <div class="grid">
        <button
          onClick={async () => {
            await client.signOut();
            location.reload();
          }}
        >
          Sign Out
        </button>
        <button
          class="primary"
          onClick={() => {
            navigator.clipboard.writeText(authString).then(() => {
              setButtonText("Copied");
            }).catch(() => {
              setButtonText("Failed to Copy");
            })
              .finally(() => {
                setTimeout(() => {
                  setButtonText(COPY);
                }, 2000);
              });
          }}
        >
          {buttonText()}
        </button>
      </div>
    </div>
  );
}
