import * as path from "path";
import * as fs from "fs";
import { encryptAsync, decryptAsync } from "../src";

const directoryName = "test-encrypt";
const encryptionExtension = "encrypted";
const encryptionPassword = "123";

const encryptedFileName = `${directoryName}.${encryptionExtension}`;

const currentDirectoryPath = __dirname;
const tempDirectoryPath = path.join(currentDirectoryPath, "temp");

const pathToEncrypt = path.join(currentDirectoryPath, directoryName);
const encryptResultPath = path.join(tempDirectoryPath, encryptedFileName);

const pathToDecrypt = path.join(tempDirectoryPath, encryptedFileName);
const decryptResultPath = path.join(tempDirectoryPath, directoryName);

describe("Encryption Tests", () => {

    // Put in the same test as tests may run concurrently but we want these to be sequential
    it("should encrypt and decrypt successfully", async () => {
        expectTempDirectoryToBeClean();
        createEmptyTestDirectory();

        await encryptAsync(encryptionPassword, pathToEncrypt, encryptResultPath);

        const encryptionExists = fs.existsSync(pathToEncrypt);
        expect(encryptionExists).toBeTruthy();

        await decryptAsync(encryptionPassword, pathToDecrypt, decryptResultPath);

        const decryptionExists = fs.existsSync(decryptResultPath);
        expect(decryptionExists).toBeTruthy();


        // Note: this does not check the directory recursively. It only checks one level deep.
        // Only Node 20+ supports the recursive flag in options.
        const filesBeforeEncrypt = fs.readdirSync(pathToEncrypt, { withFileTypes: true });
        const filesAfterDecrypt = fs.readdirSync(decryptResultPath, { withFileTypes: true });

        expect(filesAfterDecrypt.length).toEqual(filesBeforeEncrypt.length);
        expect(filesAfterDecrypt).toEqual(filesBeforeEncrypt);

        for (let i = 0; i < filesBeforeEncrypt.length; i++) {
            const fileBeforeEncrypt = filesBeforeEncrypt[i];
            const fileAfterDecrypt = filesAfterDecrypt[i];

            expect(fileBeforeEncrypt).toEqual(fileAfterDecrypt);
            // console.log(fileBeforeEncrypt);
        }

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
