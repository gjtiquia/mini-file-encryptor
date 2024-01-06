import fs from "fs";
import path from "path";
import * as folderEncrypt from "folder-encrypt";

export interface IDecryptResult {
    decryptedDirectoryPath?: string,
    error?: string
}

export async function decryptAsync(password: string, inputPath: string, outputPath: string): Promise<IDecryptResult> {
    try {

        // TODO : Checking if output path already exists

        await folderEncrypt.decrypt({
            password: password,
            input: inputPath,
            output: outputPath
        })

        return { decryptedDirectoryPath: outputPath }
    }
    catch (e) {
        let errorMessage = (e as Error).message;

        if (errorMessage === "Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?")
            errorMessage = "Unable to decrypt. Are you sure you are using the correct password?"

        return { error: errorMessage }
    }
}