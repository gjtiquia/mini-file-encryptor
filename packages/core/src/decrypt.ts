import * as folderEncrypt from "folder-encrypt";
import { modifyPathIfExists } from "./util";

export interface IDecryptResult {
    decryptedDirectoryPath?: string,
    error?: string
}

export async function decryptAsync(password: string, inputPath: string, outputPath: string): Promise<IDecryptResult> {

    let actualOutputPath = modifyPathIfExists(outputPath);

    try {
        await folderEncrypt.decrypt({
            password: password,
            input: inputPath,
            output: actualOutputPath
        })

        return { decryptedDirectoryPath: actualOutputPath }
    }
    catch (e) {

        let errorMessage = (e as Error).message;

        if (errorMessage === "Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?") {
            errorMessage = "Unable to decrypt. Are you sure you are using the correct password?"
        }
        else {
            // Unexpected error, should definitely console log it
            console.error(e);
        }

        return { error: errorMessage }
    }
}