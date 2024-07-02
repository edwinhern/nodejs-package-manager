export const fetchPackageData = async (packageName: string, version = "latest") => {
  const metadataUrl = `https://registry.npmjs.org/${packageName}`;

  try {
    const metadataResponse = await fetch(metadataUrl);
    if (!metadataResponse.ok) {
      throw new Error(`Failed to fetch metadata for ${packageName} with status: ${metadataResponse.status}`);
    }
    const metadata = await metadataResponse.json();

    let resolvedVersion = version;
    if (version === "latest" || version.startsWith("^")) {
      const versions = Object.keys(metadata.versions);
      resolvedVersion = versions.find((v) => v === version.replace("^", "")) || metadata["dist-tags"].latest;
    }

    const url = `https://registry.npmjs.org/${packageName}/${resolvedVersion}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch package data for ${packageName}@${resolvedVersion} with status: ${response.status}`,
      );
    }
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch package data for ${packageName}@${version}: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred while fetching package data for ${packageName}@${version}`);
    }
  }
};
