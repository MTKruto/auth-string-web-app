import type { User } from "@mtkruto/mtkruto";
import { createSignal } from "solid-js";

export declare namespace Stage {
  export interface ApiCredentials {
    kind: "api_credentials";
  }

  export interface PhoneNumberOrBotBotToken {
    kind: "phone_number_or_bot_token";
  }

  export interface PhoneCode {
    kind: "phone_code";
  }

  export interface Password {
    kind: "password";
    hint: string | null;
  }

  export interface SignedIn {
    kind: "signed_in";
    authString: string;
    me: User;
  }
}

export type Stage =
  | Stage.ApiCredentials
  | Stage.PhoneNumberOrBotBotToken
  | Stage.PhoneCode
  | Stage.Password
  | Stage.SignedIn;

export const [stage, setStage] = createSignal<Stage>(
  { kind: "api_credentials" },
  // { kind: "signed_in", authString: crypto.randomUUID().repeat(1000) }, // debug
);
