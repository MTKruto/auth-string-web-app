import { setError } from "../state/error";
import { setIsBusy } from "../state/isBusy";

export async function runAction(action: () => Promise<void>) {
  setIsBusy(true);

  try {
    await action();
  } catch (err) {
    console.trace(err);
    setError("An unexpected error occurred. Check the console for more.");
  } finally {
    setIsBusy(false);
  }
}
