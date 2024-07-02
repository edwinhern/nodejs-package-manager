import path from "node:path";
import { LOCK_FILE_PATH, NODE_MODULES_PATH, OUTPUT_PATH, PACKAGE_JSON_PATH } from "@/config/paths";
import { fetchPackageData } from "@/services/apiService";
import type { PackageJson, PackageLockFile } from "@/types";
import { downloadAndExtractTarball } from "@/utils/downloadUtils";
import { handleError } from "@/utils/errorUtils";
import { ensureDirectoryExists, readJsonFile, writeJsonFile } from "@/utils/fileUtils";
import type { Ora } from "ora";

export const addPackage = async (packageName: string, spinner: Ora): Promise<void> => {
  ensureDirectoryExists(OUTPUT_PATH);

  const packageJson = readJsonFile<PackageJson>(PACKAGE_JSON_PATH, { dependencies: {} });
  const lockFile = readJsonFile<PackageLockFile>(LOCK_FILE_PATH, {
    name: "custom-nodejs-package-manager",
    version: "1.0.0",
    lockfileVersion: 1,
    requires: true,
    packages: {},
  });

  let [name, version] = packageName.split("@");
  version = version || "latest";

  spinner.text = `Fetching package: ${name}@${version}`;

  try {
    const packageData = await fetchPackageData(name, version);

    packageJson.dependencies[name] = packageData.version;
    lockFile.packages[`${name}@${packageData.version}`] = {
      version: packageData.version,
      resolved: packageData.dist.tarball,
      integrity: packageData.dist.integrity,
    };

    writeJsonFile(PACKAGE_JSON_PATH, packageJson);
    writeJsonFile(LOCK_FILE_PATH, lockFile);
    spinner.succeed(`Added ${name}@${packageData.version} to dependencies.`);
  } catch (error) {
    handleError(error, spinner, `Failed to add package: ${name}@${version}`);
  }
};

export const installPackages = async (spinner: Ora): Promise<void> => {
  const packageJson = readJsonFile<PackageJson>(PACKAGE_JSON_PATH, { dependencies: {} });
  const lockFile = readJsonFile<PackageLockFile>(LOCK_FILE_PATH, {
    name: "custom-nodejs-package-manager",
    version: "1.0.0",
    lockfileVersion: 1,
    requires: true,
    packages: {},
  });

  if (!packageJson.dependencies || Object.keys(packageJson.dependencies).length === 0) {
    spinner.info("No dependencies to install.");
    return;
  }

  // Ensure directories exist only if there are dependencies to install
  ensureDirectoryExists(OUTPUT_PATH);
  ensureDirectoryExists(NODE_MODULES_PATH);

  const dependencies = packageJson.dependencies;

  for (const [packageName, version] of Object.entries(dependencies)) {
    const exactVersion = lockFile.packages[`${packageName}@${version}`]?.version || version;
    spinner.start(`Installing ${packageName}@${version}...`);

    try {
      await downloadAndExtractPackage(packageName, exactVersion as string, NODE_MODULES_PATH);
      spinner.succeed(`${packageName}@${version} installed.`);
    } catch (error) {
      handleError(error, spinner, `Failed to install package: ${packageName}@${version}`);
    }
  }
};

const downloadAndExtractPackage = async (packageName: string, version: string, outputPath: string): Promise<void> => {
  const packageData = await fetchPackageData(packageName, version);
  const tarballUrl = packageData.dist.tarball;

  const packagePath = path.resolve(outputPath, packageName);
  ensureDirectoryExists(packagePath);

  await downloadAndExtractTarball(tarballUrl, packagePath);
};
