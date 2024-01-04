import * as path from "path";
import * as fs from "fs";
import { encryptAsync, decryptAsync } from "../src";

const directoryName = "test-encrypt";
const encryptionExtension = "encrypted";
const encryptionPassword = "123";

const encryptedFileName = `${directoryName}.${encryptionExtension}`;

const currentDirectoryPath = __dirname;
const tempDirectoryPath = path.join(currentDirectoryPath, "temp");

const encryptInputPath = path.join(currentDirectoryPath, directoryName);
const encryptOutputPath = path.join(tempDirectoryPath, encryptedFileName);

const decryptInputPath = path.join(tempDirectoryPath, encryptedFileName);
const decryptOutputPath = path.join(tempDirectoryPath, directoryName);

describe("Encryption Tests", () => {

    // Put in the same test as tests may run concurrently but we want these to be sequential
    it("should encrypt and decrypt successfully", async () => {
        expectTempDirectoryToBeClean();
        createEmptyTestDirectory();

        await encryptAsync(encryptionPassword, encryptInputPath, encryptOutputPath);

        const encryptionExists = fs.existsSync(encryptInputPath);
        expect(encryptionExists).toBeTruthy();

        await decryptAsync(encryptionPassword, decryptInputPath, decryptOutputPath);

        const decryptionExists = fs.existsSync(decryptOutputPath);
        expect(decryptionExists).toBeTruthy();

        expectDirectoriesToBeEqual(encryptInputPath, decryptOutputPath);


        // This raises an error where it cannot completely delete the temp directory...
        // It does not raise error after encryption but only raises after decryption
        // Not sure why but at least can delete before the test
        // For now added temp directory to .gitignore
        // expectTempDirectoryToBeClean();
    })
})

function expectTempDirectoryToBeClean() {
    const tempDirectoryExists = fs.existsSync(tempDirectoryPath);
    if (tempDirectoryExists) {
        try {
            fs.rmSync(tempDirectoryPath, { recursive: true, force: true });
        }
        catch (e) {
            if (fs.existsSync(tempDirectoryPath))
                fs.rmSync(tempDirectoryPath, { recursive: true, force: true });
        }
    }

    const isTempDirectoryCleanBeforeTest = fs.existsSync(tempDirectoryPath) === false;
    expect(isTempDirectoryCleanBeforeTest).toBeTruthy();
}

function createEmptyTestDirectory() {
    fs.mkdirSync(tempDirectoryPath);
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
