# Mini File Encryptor - Desktop

The desktop frontend for Mini File Encryptor using [Electron](https://www.electronjs.org/).

Scaffolded with [Electron Forge](https://www.electronforge.io/) using the command `npm init electron-app@latest desktop -- --template=vite-typescript`.

## Commands

After running `npm install` in the root directory, the following commands can be run from this directory.

Run the following command to start a development server.

```bash
npm run start
```

## Notes

Ran into issues with NPM workspaces / monorepo setup. Electron Forge assumes that the node modules are in the same folder.
May need to consider migrating to yarn, as they have a no-hoist option.
Either that or migrate to electron-builder instead of Forge, as they have two-package.json support. But... Webpack instead of Vite.

## React References

- <https://www.electronforge.io/guides/framework-integration/react-with-typescript>
- <https://react.dev/learn/add-react-to-an-existing-project>

## NPM Workspaces/Monorepo References

- <https://github.com/electron/windows-installer/issues/193>
- <https://github.com/npm/rfcs/issues/287>
- <https://github.com/electron/forge/issues/2306>
