import type { ConnectionState } from "@mtkruto/mtkruto";
import { createSignal } from "solid-js";

export const [connectionState, setConnectionState] = createSignal<ConnectionState>("notConnected");
