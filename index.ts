import { readdirSync, existsSync } from "node:fs";
import { homedir } from "os";
import { $ } from "bun";

import type { OutputElement } from "./models/output-element";

const extensionsDir: string = `${homedir()}/.local/share/gnome-shell/extensions`;
const extensionFolders: string[] = readdirSync(extensionsDir);
const currentVersion: number = await getCurrentGnomeVersion();
const results: OutputElement[] = [];

for (const ef of extensionFolders) {
  const metadataFilePath: string = `${extensionsDir}/${ef}/metadata.json`;
  if (existsSync(metadataFilePath)) {
    const metadata = await await Bun.file(metadataFilePath).json();
    const supportedVersions: number[] = Array.from(
      metadata["shell-version"]
    ).map((str) => Number(str));
    const highestVersion: number =
      supportedVersions[supportedVersions.length - 1]!;

    results.push({
      extensionName: ef,
      highestVersion,
      isSupported: highestVersion > currentVersion,
    });
  } else {
    // Extensions without metadata.json
    results.push({
      extensionName: ef,
      highestVersion: "unknown",
      isSupported: "unknown",
    });
  }
}

console.log("------------------------");
results
  .sort((a, b) => a.isSupported - b.isSupported)
  .forEach(({ extensionName, highestVersion, isSupported }) => {
    console.log(
      `${
        isSupported ? "✅" : "❌"
      } ${extensionName} | Highest Supported Version: ${highestVersion}`
    );
  });
console.log("------------------------");
const unsupportedCount: number = results.filter(
  ({ isSupported }) => isSupported
).length;
console.log(
  `${
    unsupportedCount !== 0
      ? `${unsupportedCount} Extensions not`
      : "All Extentensions"
  } Supported by next Gnome-Version`
);

async function getCurrentGnomeVersion(): Promise<number> {
  console.log("Current Version: ");
  const versionString: string = (await $`gnome-shell --version`)
    .text()
    .replace("GNOME Shell ", "");
  const version = Math.floor(Number(versionString));
  return version;
}
