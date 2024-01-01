# Mini File Encryptor

Mini File Encryptor, a minimalistic offline file encryptor.

All the business rules are encapsulated in `/packages/core`, while the various cross-platform application interfaces are in `/apps`.

This monorepo is managed using [Turborepo](https://turbo.build/repo).

## General Commands

Run the following command in the root directory to install all the packages required by the monorepo.

```bash
npm install
```

Run the following command to build all the packages in the monorepo.

```bash
npm run build
```

Run the following command to run all the tests in the monorepo.

```bash
npm run test
```

## Other Commands

Run the following command to install a package in a specific workspace.

```bash
npm install <package> --workspace=<workspace>
```

Eg. `npm install folder-encrypt --workspace=packages/core`

## References

- <https://docs.npmjs.com/cli/v8/using-npm/workspaces>
- <https://turbo.build/repo/docs/handbook>