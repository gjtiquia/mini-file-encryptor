import * as folderEncrypt from "folder-encrypt";

export async function encryptAsync(password: string, inputPath: string, outputPath: string) {
    await folderEncrypt.encrypt({
        password: password,
        input: inputPath,
        output: outputPath
    })
}

interface IDecryptResult {
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
        return { error: (e as Error).message }
    }
}