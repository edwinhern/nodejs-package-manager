import { installPackages } from "@/services/packageService";
import { handleError } from "@/utils/errorUtils";
import ora from "ora";

export const runInstallCommand = async () => {
  const spinner = ora("Starting install command...").start();

  try {
    await installPackages(spinner);
  } catch (error) {
    handleError(error, spinner, "Failed to install packages");
  }
};
