import { Show } from "solid-js";
import { PasswordForm } from "./stages/PasswordForm";
import { PhoneCodeForm } from "./stages/PhoneCodeForm";
import { PhoneNumberOrBotTokenForm } from "./stages/PhoneNumberOrBotTokenForm";
import { SignedIn } from "./stages/SignedIn";
import { connectionState } from "./state/connectionState";
import { error } from "./state/error";
import { stage } from "./state/stage";
import "./App.css";
import "./Form.css";
import { ApiCredentialsForm } from "./stages/ApiCredentialsForm";

export function App() {
  return (
    <>
      <header>
        <section>
          <b>MTKruto</b> <span>Auth String</span>
        </section>
      </header>
      <main>
        <section>
          <Show when={stage().kind === "api_credentials"}>
            <ApiCredentialsForm />
          </Show>
          <Show when={stage().kind !== "api_credentials" && connectionState() !== "ready"}>
            <div class="fullscreen-notice">Connecting</div>
          </Show>
          <Show when={connectionState() === "ready"}>
            <Show when={stage().kind === "phone_number_or_bot_token"}>
              <PhoneNumberOrBotTokenForm />
            </Show>
            <Show when={stage().kind === "phone_code"}>
              <PhoneCodeForm />
            </Show>
            <Show when={stage().kind === "password"}>
              <PasswordForm />
            </Show>
            <Show when={stage().kind === "signed_in"}>
              <SignedIn />
            </Show>
          </Show>
          <article class="error">
            {error()}
          </article>
        </section>
      </main>
    </>
  );
}
