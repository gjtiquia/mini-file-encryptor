import * as folderEncrypt from "folder-encrypt";
import * as path from "path";

const encryptionPassword = "123";
const folderName = "test-encrypt";
const encryptedFileName = "test-encrypt.encrypted";
const decryptedFolderName = "test-decrypt";

const currentDirectory = __dirname;
const pathToEncrypt = path.join(currentDirectory, "..", "__tests__", folderName);
const pathToDecrypt = path.join(currentDirectory, "..", "__tests__", encryptedFileName);
const decryptResultPath = path.join(currentDirectory, "..", "__tests__", decryptedFolderName);

function encrypt() {
    folderEncrypt.encrypt({
        password: encryptionPassword,
        input: pathToEncrypt,
    }).then(() => {
        console.log('encrypted!');
    }).catch((err) => {
        console.log(err);
    });
}

function decrypt() {
    folderEncrypt.decrypt({
        password: encryptionPassword,
        input: pathToDecrypt,
        output: decryptResultPath // optional, default will be input path without extension
    }).then(() => {
        console.log('decrypted!');
        // when using a wrong password on file decryption, the file will be decrypted to a bunch of garbled text. 
        // But still considered `decrypted` due to there is no way knowing the original content.
    }).catch((err) => {
        console.log(err);
        // when using a wrong password on directory decryption, a `tar is corrupted` error will occured.
    });
}

// Comment either one

// encrypt();
// decrypt();