import { createSignal } from "solid-js";
import { checkCode } from "../actions/checkCode";
import { isBusy } from "../state/isBusy";

export function PhoneCodeForm() {
  const [verificationCode, setVerificationCode] = createSignal("");

  return (
    <form
      class="form"
      onsubmit={async (e) => {
        e.preventDefault();

        checkCode(verificationCode());
      }}
    >
      <input
        disabled={isBusy()}
        type="text"
        value={verificationCode()}
        onInput={(e) => setVerificationCode(e.target.value)}
        placeholder={"Verification code"}
        pattern={"^[1-9][0-9]*$"}
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
