import { createEffect, createSignal } from "solid-js";
import { checkBotToken } from "../actions/checkBotToken";
import { sendCode } from "../actions/sendCode";
import { isBusy } from "../state/isBusy";

export function PhoneNumberOrBotTokenForm() {
  const [botToken, setBotToken] = createSignal("");
  const [phoneNumber, setPhoneNumber] = createSignal("");
  const [signInKind, setSignInKind] = createSignal<"user" | "bot">("user");

  createEffect(() => {
    if (phoneNumber().length && !phoneNumber().startsWith("+")) {
      setPhoneNumber("+" + phoneNumber());
    }
  });

  return (
    <form
      class="form"
      onsubmit={async (e) => {
        e.preventDefault();

        if (signInKind() === "user") {
          sendCode(phoneNumber());
        } else {
          checkBotToken(botToken());
        }
      }}
    >
      <input
        disabled={isBusy()}
        type="text"
        value={signInKind() === "user" ? phoneNumber() : botToken()}
        onInput={(e) => (signInKind() === "user" ? setPhoneNumber : setBotToken)(e.target.value)}
        placeholder={signInKind() === "user" ? "Phone number" : "Bot token"}
        pattern={signInKind() === "user" ? "^\\+[1-9][0-9]*$" : "^[1-9][0-9]*:[A-Za-z\\-_0-9]+$"}
        required
        autocomplete="off"
      />
      <div class="grid">
        <button
          type="button"
          disabled={isBusy()}
          onClick={() => {
            setSignInKind(signInKind() === "user" ? "bot" : "user");
          }}
        >
          Sign In as {signInKind() === "user" ? "Bot" : "User"}
        </button>
        <button type="submit" disabled={isBusy()} class="primary">Next</button>
      </div>
    </form>
  );
}
