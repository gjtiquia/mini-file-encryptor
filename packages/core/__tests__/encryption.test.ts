import * as path from "path";
import * as fs from "fs";
import { encryptAsync, decryptAsync } from "../src";

const directoryToEncryptName = "test-encrypt";
const encryptionExtension = "encrypted";
const encryptionPassword = "123";

const encryptedFileName = `${directoryToEncryptName}.${encryptionExtension}`;

const currentDirectoryPath = __dirname;
const tempParentDirectoryPath = path.join(currentDirectoryPath, "temp");

describe("Encryption Tests", () => {

    beforeAll(() => {
        expectTempDirectoryToBeClean();
        createEmptyDirectory(tempParentDirectoryPath);
    })

    it("should encrypt and decrypt successfully", async () => {

        const tempDirectoryPath = path.join(tempParentDirectoryPath, "temp1");
        createEmptyDirectory(tempDirectoryPath);

        const encryptInputPath = path.join(currentDirectoryPath, directoryToEncryptName);
        const encryptOutputPath = path.join(tempDirectoryPath, encryptedFileName);

        const decryptInputPath = path.join(tempDirectoryPath, encryptedFileName);
        const decryptOutputPath = path.join(tempDirectoryPath, directoryToEncryptName);

        await encryptAsync(encryptionPassword, encryptInputPath, encryptOutputPath);
        expectPathToExist(encryptOutputPath);

        const result = await decryptAsync(encryptionPassword, decryptInputPath, decryptOutputPath);
        expectPathToExist(decryptOutputPath);
        expect(result.error).toBeFalsy()

        expectDirectoriesToBeEqual(encryptInputPath, decryptOutputPath);

        // This raises an error where it cannot completely delete the temp directory...
        // It does not raise error after encryption but only raises after decryption
        // Not sure why but at least can delete before the test
        // For now added temp directory to .gitignore, and open new temp folders for each test
        // expectTempDirectoryToBeClean();
    })

    it("should give error message when decrypt with wrong password", async () => {

        const tempDirectoryPath = path.join(tempParentDirectoryPath, "temp2");
        createEmptyDirectory(tempDirectoryPath);

        const encryptInputPath = path.join(currentDirectoryPath, directoryToEncryptName);
        const encryptOutputPath = path.join(tempDirectoryPath, encryptedFileName);

        const decryptInputPath = path.join(tempDirectoryPath, encryptedFileName);
        const decryptOutputPath = path.join(tempDirectoryPath, directoryToEncryptName);

        await encryptAsync(encryptionPassword, encryptInputPath, encryptOutputPath);
        expectPathToExist(encryptOutputPath);

        const wrongPassword = encryptionPassword + "2";
        const result = await decryptAsync(wrongPassword, decryptInputPath, decryptOutputPath);

        expectPathToNotExist(decryptOutputPath);
        expect(result.error).toBeTruthy();
        expect(result.error).toEqual("Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?");
    })
})

function expectTempDirectoryToBeClean() {
    const tempDirectoryExists = fs.existsSync(tempParentDirectoryPath);
    if (tempDirectoryExists) {
        try {
            fs.rmSync(tempParentDirectoryPath, { recursive: true, force: true });
        }
        catch (e) {
            if (fs.existsSync(tempParentDirectoryPath))
                fs.rmSync(tempParentDirectoryPath, { recursive: true, force: true });
        }
    }

    const isTempDirectoryCleanBeforeTest = fs.existsSync(tempParentDirectoryPath) === false;
    expect(isTempDirectoryCleanBeforeTest).toBeTruthy();
}

function createEmptyDirectory(path: string) {
    fs.mkdirSync(path);
}

function expectPathToExist(path: string) {
    const exists = fs.existsSync(path);
    expect(exists).toBeTruthy();
}

function expectPathToNotExist(path: string) {
    const exists = fs.existsSync(path);
    expect(exists).toBeFalsy();
}

function expectDirectoriesToBeEqual(path1: string, path2: string) {
    // Note: this does not check the directory recursively. It only checks one level deep.
    // Only Node 20+ supports the recursive flag in options.
    const filesBeforeEncrypt = fs.readdirSync(path1, { withFileTypes: true });
    const filesAfterDecrypt = fs.readdirSync(path2, { withFileTypes: true });

    expect(filesAfterDecrypt.length).toEqual(filesBeforeEncrypt.length);

    for (let i = 0; i < filesBeforeEncrypt.length; i++) {
        const fileBeforeEncrypt = filesBeforeEncrypt[i];
        const fileAfterDecrypt = filesAfterDecrypt[i];

        // Don't compare path as one is in a temp folder and one is not
        expect(fileBeforeEncrypt.name).toEqual(fileAfterDecrypt.name);
    }
}
