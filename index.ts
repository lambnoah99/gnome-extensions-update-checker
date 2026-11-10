import { $ } from "bun";

const currentVersion: number = await getCurrentGnomeVersion();

async function getCurrentGnomeVersion(): Promise<number> {
  console.log("Current Version: ");
  const versionString: string = (await $`gnome-shell --version`)
    .text()
    .replace("GNOME Shell ", "");
  const version = Math.floor(Number(versionString));
  return version;
}
