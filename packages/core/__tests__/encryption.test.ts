import * as path from "path";
import * as fs from "fs";
import { encryptAsync, decryptAsync } from "../src";

const _directoryToEncryptName = "test-encrypt";
const _encryptionExtension = "encrypted";
const _encryptionPassword = "123";

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

        const encryptResult = await encryptAsync(_encryptionPassword, paths.encryptInputPath, paths.encryptOutputPath);

        expectPathToExist(paths.encryptOutputPath);
        expect(encryptResult.encryptedFilePath).toEqual(paths.encryptOutputPath);
        expect(encryptResult.error).toBeFalsy()

        const decryptResult = await decryptAsync(_encryptionPassword, paths.decryptInputPath, paths.decryptOutputPath);

        expectPathToExist(paths.decryptOutputPath);
        expect(decryptResult.decryptedDirectoryPath).toEqual(paths.decryptOutputPath);
        expect(decryptResult.error).toBeFalsy()

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

        const wrongPassword = _encryptionPassword + "2";
        const result = await decryptAsync(wrongPassword, paths.decryptInputPath, paths.decryptOutputPath);

        expectPathToNotExist(paths.decryptOutputPath);
        expect(result.decryptedDirectoryPath).toBeFalsy();
        expect(result.error).toBeTruthy();
        expect(result.error).toEqual("Unable to decrypt. Are you sure you are using the correct password?");
    })

    it("should append increasing index to path if encryption output path exists", async () => {

        const tempDirectoryPath = path.join(_tempParentDirectoryPath, "temp3");
        const paths = new TestPaths(tempDirectoryPath);
        createEmptyDirectory(tempDirectoryPath);

        const encryption_0 = await encryptAsync(_encryptionPassword, paths.encryptInputPath, paths.encryptOutputPath);
        expect(encryption_0.encryptedFilePath).toEqual(path.join(tempDirectoryPath, _directoryToEncryptName + ".encrypted"));
        expectPathToExist(encryption_0.encryptedFilePath!);

        const encryption_1 = await encryptAsync(_encryptionPassword, paths.encryptInputPath, paths.encryptOutputPath);
        expect(encryption_1.encryptedFilePath).toEqual(path.join(tempDirectoryPath, _directoryToEncryptName + "-1" + ".encrypted"));
        expectPathToExist(encryption_1.encryptedFilePath!);

        const encryption_2 = await encryptAsync(_encryptionPassword, paths.encryptInputPath, paths.encryptOutputPath);
        expect(encryption_2.encryptedFilePath).toEqual(path.join(tempDirectoryPath, _directoryToEncryptName + "-2" + ".encrypted"));
        expectPathToExist(encryption_2.encryptedFilePath!);

        const encryption_3 = await encryptAsync(_encryptionPassword, paths.encryptInputPath, paths.encryptOutputPath);
        expect(encryption_3.encryptedFilePath).toEqual(path.join(tempDirectoryPath, _directoryToEncryptName + "-3" + ".encrypted"));
        expectPathToExist(encryption_3.encryptedFilePath!);
    })

    it("should encrypt with increasing index correctly if an indexed output exists but non-indexed output does not exist", async () => {

        const tempDirectoryPath = path.join(_tempParentDirectoryPath, "temp4");
        const paths = new TestPaths(tempDirectoryPath);
        createEmptyDirectory(tempDirectoryPath);

        const encryption_2 = await encryptAsync(_encryptionPassword, paths.encryptInputPath, paths.customEncryptOutputPath(`${_directoryToEncryptName}-2`));
        expect(encryption_2.encryptedFilePath).toEqual(path.join(tempDirectoryPath, _directoryToEncryptName + "-2" + ".encrypted"));
        expectPathToExist(encryption_2.encryptedFilePath!);

        // starts from index 0
        const encryption_0 = await encryptAsync(_encryptionPassword, paths.encryptInputPath, paths.encryptOutputPath);
        expect(encryption_0.encryptedFilePath).toEqual(path.join(tempDirectoryPath, _directoryToEncryptName + ".encrypted"));
        expectPathToExist(encryption_0.encryptedFilePath!);

        const encryption_1 = await encryptAsync(_encryptionPassword, paths.encryptInputPath, paths.encryptOutputPath);
        expect(encryption_1.encryptedFilePath).toEqual(path.join(tempDirectoryPath, _directoryToEncryptName + "-1" + ".encrypted"));
        expectPathToExist(encryption_1.encryptedFilePath!);

        // Should see that -2 exists and automatically goes to -3
        const encryption_3 = await encryptAsync(_encryptionPassword, paths.encryptInputPath, paths.encryptOutputPath);
        expect(encryption_3.encryptedFilePath).toEqual(path.join(tempDirectoryPath, _directoryToEncryptName + "-3" + ".encrypted"));
        expectPathToExist(encryption_3.encryptedFilePath!);

        const encryption_4 = await encryptAsync(_encryptionPassword, paths.encryptInputPath, paths.encryptOutputPath);
        expect(encryption_4.encryptedFilePath).toEqual(path.join(tempDirectoryPath, _directoryToEncryptName + "-4" + ".encrypted"));
        expectPathToExist(encryption_3.encryptedFilePath!);
    })

    it("should append increasing index to path if decryption output path exists", async () => {

        const tempDirectoryPath = path.join(_tempParentDirectoryPath, "temp5");
        const paths = new TestPaths(tempDirectoryPath);
        createEmptyDirectory(tempDirectoryPath);

        await encryptAsync(_encryptionPassword, paths.encryptInputPath, paths.encryptOutputPath);

        const decryption_0 = await decryptAsync(_encryptionPassword, paths.decryptInputPath, paths.decryptOutputPath);
        expect(decryption_0.decryptedDirectoryPath).toEqual(path.join(tempDirectoryPath, _directoryToEncryptName));
        expectPathToExist(decryption_0.decryptedDirectoryPath!);

        const decryption_1 = await decryptAsync(_encryptionPassword, paths.decryptInputPath, paths.decryptOutputPath);
        expect(decryption_1.decryptedDirectoryPath).toEqual(path.join(tempDirectoryPath, _directoryToEncryptName + "-1"));
        expectPathToExist(decryption_1.decryptedDirectoryPath!);

        const decryption_2 = await decryptAsync(_encryptionPassword, paths.decryptInputPath, paths.decryptOutputPath);
        expect(decryption_2.decryptedDirectoryPath).toEqual(path.join(tempDirectoryPath, _directoryToEncryptName + "-2"));
        expectPathToExist(decryption_2.decryptedDirectoryPath!);
    })
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

    private _tempDirectoryPath: string;
    private _directoryToEncryptName: string;
    private _encryptionExtension: string;

    constructor(tempDirectoryPath: string) {
        const encryptedFileName = `${_directoryToEncryptName}.${_encryptionExtension}`;

        this._tempDirectoryPath = tempDirectoryPath;
        this._directoryToEncryptName = _directoryToEncryptName;
        this._encryptionExtension = _encryptionExtension;

        this.encryptInputPath = path.join(_currentDirectoryPath, _directoryToEncryptName);
        this.encryptOutputPath = path.join(tempDirectoryPath, encryptedFileName);

        this.decryptInputPath = path.join(tempDirectoryPath, encryptedFileName);
        this.decryptOutputPath = path.join(tempDirectoryPath, _directoryToEncryptName);
    }

    public customEncryptOutputPath(fileName: string) {
        const encryptedFileName = `${fileName}.${_encryptionExtension}`;
        return path.join(this._tempDirectoryPath, encryptedFileName)
    }
}
