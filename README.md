# Gnome Extensions Update Checker

A tool which checks if all installed Gnome Extensions support the next Major Gnome Version

# Disclaimer

The Software checks against the `metadata.json` file of the extension. It is up to the developer of the extensions to check wether it is really compatible with the corresponding Gnome version.

# Usage

Download `update-checker` from Releases. Run with `./update-checker`. The Tool outputs your current gnome version as well as a list of all active extensions and wether they're compatible (✅) or not (❌).

# Building

To build the binary yourself, clone the repo and run `bun run build-compile`.
