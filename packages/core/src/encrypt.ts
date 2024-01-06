import * as folderEncrypt from "folder-encrypt";
import { modifyPathIfExists } from "./util";

export interface IEncryptResult {
    encryptedFilePath?: string,
    error?: string
}

export async function encryptAsync(password: string, inputPath: string, outputPath: string): Promise<IEncryptResult> {

    let actualOutputPath = modifyPathIfExists(outputPath, ".encrypted");

    try {
        await folderEncrypt.encrypt({
            password: password,
            input: inputPath,
            output: actualOutputPath
        })

        return { encryptedFilePath: actualOutputPath }
    }
    catch (e) {
        let errorMessage = (e as Error).message;

        return { error: errorMessage }
    }
}

