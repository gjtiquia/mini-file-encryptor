import * as folderEncrypt from "folder-encrypt";

export async function encryptAsync(password: string, inputPath: string, outputPath: string) {
    await folderEncrypt.encrypt({
        password: password,
        input: inputPath,
        output: outputPath
    })
}

export interface IDecryptResult {
    error?: string
}

export async function decryptAsync(password: string, inputPath: string, outputPath: string): Promise<IDecryptResult> {
    try {
        await folderEncrypt.decrypt({
            password: password,
            input: inputPath,
            output: outputPath
        })

        return {}
    }
    catch (e) {
        let errorMessage = (e as Error).message;

        if (errorMessage === "Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?")
            errorMessage = "Unable to decrypt. Are you sure you are using the correct password?"

        return { error: errorMessage }
    }
}