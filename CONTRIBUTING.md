# Mini File Encryptor - Contributing

All the business rules are encapsulated in `/packages/core`, while the frontend source code is in `/apps`.

This monorepo is managed using [Turborepo](https://turbo.build/repo).

## General Commands

Run the following command in the root directory to install all the packages required by the monorepo.

```bash
npm install
```

Run the following command to build all the packages in `/packages`.

```bash
npm run build
```

Run the following command to run all the tests in `/packages`.

```bash
npm run test
```

Run the following command to launch the app in dev mode.

```bash
npm run start
```

Run the following command to package the app into an executable.

```bash
npm run package
```

Run the following command to package the app into an executable and make a distributable.

```bash
npm run make
```

Run the following command to package the app into an executable, make a distributable and publish to GitHub Releases.
> Note that `GITHUB_TOKEN` is required to be set in the environment before running this command. It is set in GitHub Actions by default.

```bash
npm run publish
```

## Other Commands

Run the following command to install a package in a specific workspace.

```bash
npm install <package> --workspace=<workspace>
```

## References

- <https://turbo.build/repo/docs/handbook>
