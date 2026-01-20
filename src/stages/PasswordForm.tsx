import { createSignal } from "solid-js";
import { checkPassword } from "../actions/checkPassword";
import { isBusy } from "../state/isBusy";
import { type Stage, stage } from "../state/stage";

export function PasswordForm() {
  const [password, setPassword] = createSignal("");

  return (
    <form
      class="form"
      onsubmit={async (e) => {
        e.preventDefault();

        checkPassword(password());
      }}
    >
      <input
        disabled={isBusy()}
        type="password"
        value={password()}
        onInput={(e) => setPassword(e.target.value)}
        placeholder={(stage() as Stage.Password).hint ?? "Password"}
        required
        autocomplete="off"
      />
      <div class="grid">
        <div></div>
        <button type="submit" disabled={isBusy()} class="primary">Next</button>
      </div>
    </form>
  );
}
