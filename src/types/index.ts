export type Dependencies = Record<string, string>;

export type PackageJson = {
  dependencies: Dependencies;
};

export type LockFilePackageInfo = {
  version: string;
  resolved: string;
  integrity: string;
};

export type PackageLockFile = {
  name: string;
  version: string;
  lockfileVersion: number;
  requires: boolean;
  packages: Record<string, LockFilePackageInfo>;
};
