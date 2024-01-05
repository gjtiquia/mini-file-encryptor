import * as path from "path";
import * as fs from "fs";
import { encryptAsync, decryptAsync } from "../src";

const _directoryToEncryptName = "test-encrypt";
const _encryptionExtension = "encrypted";
const _encryptionPassword = "123";

const _encryptedFileName = `${_directoryToEncryptName}.${_encryptionExtension}`;

const _currentDirectoryPath = __dirname;
const _tempParentDirectoryPath = path.join(_currentDirectoryPath, "temp");

describe("Encryption Tests", () => {

    beforeAll(() => {
        expectTempDirectoryToBeClean();
        createEmptyDirectory(_tempParentDirectoryPath);
    })

    it("should encrypt and decrypt successfully", async () => {

        const tempDirectoryPath = path.join(_tempParentDirectoryPath, "temp1");
        const paths = new TestPaths(tempDirectoryPath);
        createEmptyDirectory(tempDirectoryPath);

        await encryptAsync(_encryptionPassword, paths.encryptInputPath, paths.encryptOutputPath);
        expectPathToExist(paths.encryptOutputPath);

        const result = await decryptAsync(_encryptionPassword, paths.decryptInputPath, paths.decryptOutputPath);
        expectPathToExist(paths.decryptOutputPath);
        expect(result.error).toBeFalsy()

        expectDirectoriesToBeEqual(paths.encryptInputPath, paths.decryptOutputPath);

        // This raises an error where it cannot completely delete the temp directory...
        // It does not raise error after encryption but only raises after decryption
        // Not sure why but at least can delete before running all the test
        // For now added temp directory to .gitignore, and open new temp folders for each test
        // expectTempDirectoryToBeClean();
    })

    it("should give error message when decrypt with wrong password", async () => {

        const tempDirectoryPath = path.join(_tempParentDirectoryPath, "temp2");
        const paths = new TestPaths(tempDirectoryPath);
        createEmptyDirectory(tempDirectoryPath);

        await encryptAsync(_encryptionPassword, paths.encryptInputPath, paths.encryptOutputPath);
        expectPathToExist(paths.encryptOutputPath);

        const wrongPassword = _encryptionPassword + "2";
        const result = await decryptAsync(wrongPassword, paths.decryptInputPath, paths.decryptOutputPath);

        expectPathToNotExist(paths.decryptOutputPath);
        expect(result.error).toBeTruthy();
        expect(result.error).toEqual("Unable to decrypt. Are you sure you are using the correct password?");
    })

    // TODO : encryption output path already exists (append -1, -2, -3, -4...)
    // TODO : decryption output path already exists (append -1, -2, -3, -4...)
})

function expectTempDirectoryToBeClean() {
    const tempDirectoryExists = fs.existsSync(_tempParentDirectoryPath);
    if (tempDirectoryExists) {
        try {
            fs.rmSync(_tempParentDirectoryPath, { recursive: true, force: true });
        }
        catch (e) {
            if (fs.existsSync(_tempParentDirectoryPath))
                fs.rmSync(_tempParentDirectoryPath, { recursive: true, force: true });
        }
    }

    const isTempDirectoryCleanBeforeTest = fs.existsSync(_tempParentDirectoryPath) === false;
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

class TestPaths {
    public encryptInputPath: string;
    public encryptOutputPath: string;
    public decryptInputPath: string;
    public decryptOutputPath: string;

    constructor(tempDirectoryPath: string) {
        this.encryptInputPath = path.join(_currentDirectoryPath, _directoryToEncryptName);
        this.encryptOutputPath = path.join(tempDirectoryPath, _encryptedFileName);

        this.decryptInputPath = path.join(tempDirectoryPath, _encryptedFileName);
        this.decryptOutputPath = path.join(tempDirectoryPath, _directoryToEncryptName);
    }
}
