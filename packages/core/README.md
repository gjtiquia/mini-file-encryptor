# Mini File Encryptor - Core

The core business rules for Mini File Encryptor.

## Commands

After running `yarn install` in the root directory, the following commands can be run from this directory.

Run the following command to compile the JavaScript package from TypeScript.

```bash
yarn build
```

Run the following command to run all the tests for this package.

```bash
yarn test
```

## Notes

Used the npm package `folder-encrypt` for encryption. Upon inspection of the source code, it uses the built-in Node package `crypto` and AES256 for encryption.

## References

<https://github.com/scrwdrv/folder-encrypt>
<https://nodejs.org/api/crypto.html>
