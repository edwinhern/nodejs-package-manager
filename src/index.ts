import { runAddCommand } from "@/commands/add";
import { runInstallCommand } from "@/commands/install";
import { handleError } from "@/utils/errorUtils";
import ora from "ora";

const command = process.argv[2];

const runCommand = async () => {
  try {
    switch (command) {
      case "add":
        await runAddCommand();
        break;
      case "install":
        await runInstallCommand();
        break;
      default:
        ora().fail('Invalid command. Use "add <package_name>" or "install".');
    }
  } catch (error) {
    handleError(error, ora(), "An error occurred while running the command.");
  }
};

runCommand();
