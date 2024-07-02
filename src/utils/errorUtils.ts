import type { Ora } from "ora";

export const handleError = (error: unknown, spinner: Ora, message: string) => {
  if (error instanceof Error) {
    spinner.fail(`${message}: ${error.message}`);
  } else {
    spinner.fail(`${message}. An unknown error occurred.`);
  }
};
