import * as fs from "node:fs";

export const ensureDirectoryExists = (directoryPath: string): void => {
  fs.mkdirSync(directoryPath, { recursive: true });
};

export const readJsonFile = <T>(filePath: string, defaultValue: T): T => {
  if (!fs.existsSync(filePath)) {
    return defaultValue;
  }
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent) as T;
};

export const writeJsonFile = (filePath: string, data: unknown): void => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};
