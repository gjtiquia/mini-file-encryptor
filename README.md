# Mini File Encryptor

Mini File Encryptor, a minimalistic offline file encryptor.

All the business rules are encapsulated in `/packages/core`, while the frontend in `/apps`.

This monorepo is managed using [Turborepo](https://turbo.build/repo).

## General Commands

Run the following command in the root directory to install all the packages required by the monorepo.

```bash
yarn install
```

Run the following command to build all the packages in the monorepo.

```bash
yarn build
```

Run the following command to run all the tests in the monorepo.

```bash
yarn test
```

## Other Commands

Run the following command to install a package in a specific workspace.

```bash
yarn workspace <workspace> add <package>
```

## References

- <https://turbo.build/repo/docs/handbook>
