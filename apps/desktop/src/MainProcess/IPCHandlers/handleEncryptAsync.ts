import { IpcMainInvokeEvent } from 'electron';
import { encryptAsync } from "core";

export async function handleEncryptAsync(e: IpcMainInvokeEvent, params: IEncryptParams) {
    const outputPath = getEncryptOutputPath(params.inputPath);
    await encryptAsync(params.password, params.inputPath, outputPath);
}

function getEncryptOutputPath(inputPath: string) {
    return `${inputPath}.encrypted`
}