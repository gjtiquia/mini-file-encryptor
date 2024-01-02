import * as folderEncrypt from "folder-encrypt";

export async function encryptAsync(password: string, inputPath: string, outputPath: string) {
    await folderEncrypt.encrypt({
        password: password,
        input: inputPath,
        output: outputPath
    })
}

export async function decryptAsync(password: string, inputPath: string, outputPath: string) {
    await folderEncrypt.decrypt({
        password: password,
        input: inputPath,
        output: outputPath
    })
}