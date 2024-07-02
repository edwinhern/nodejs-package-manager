import { Readable } from "node:stream";
import * as zlib from "node:zlib";
import * as tar from "tar";

export const downloadAndExtractTarball = async (tarballUrl: string, extractPath: string): Promise<void> => {
  const response = await fetch(tarballUrl);
  if (!response.ok) {
    throw new Error(`Failed to download tarball from ${tarballUrl}`);
  }

  if (!response.body) {
    throw new Error("Response body is null");
  }

  const responseBuffer = await response.arrayBuffer();
  const readableStream = new Readable();
  readableStream._read = () => {};
  readableStream.push(Buffer.from(responseBuffer));
  readableStream.push(null);

  await new Promise((resolve, reject) => {
    readableStream
      .pipe(zlib.createGunzip())
      .pipe(tar.extract({ cwd: extractPath, strip: 1 }))
      .on("finish", resolve)
      .on("error", reject);
  });
};
