import * as path from "node:path";

export const OUTPUT_PATH = path.resolve("output");
export const PACKAGE_JSON_PATH = path.resolve(OUTPUT_PATH, "package.json");
export const NODE_MODULES_PATH = path.resolve(OUTPUT_PATH, "node_modules");
export const LOCK_FILE_PATH = path.resolve(OUTPUT_PATH, "package-lock.json");
