import { addPackage } from "@/services/packageService";
import { handleError } from "@/utils/errorUtils";
import ora from "ora";

export const runAddCommand = async () => {
  const spinner = ora("Starting add command...").start();

  try {
    const packageNames = process.argv.slice(3);
    if (packageNames.length === 0) {
      throw new Error("Please specify at least one package name.");
    }

    for (const packageName of packageNames) {
      spinner.start(`Adding package: ${packageName}`);
      await addPackage(packageName, spinner);
    }
  } catch (error) {
    handleError(error, spinner, "Failed to add package");
  }
};
