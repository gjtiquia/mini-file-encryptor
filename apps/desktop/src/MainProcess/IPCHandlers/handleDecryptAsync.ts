import { IpcMainInvokeEvent } from 'electron';
import { decryptAsync } from "core";

export async function handleDecryptAsync(e: IpcMainInvokeEvent, params: IDecryptParams) {
    const outputPath = getDecryptOutputPath(params.inputPath);
    await decryptAsync(params.password, params.inputPath, outputPath);
}

function getDecryptOutputPath(inputPath: string) {
    return inputPath.replace(".encrypted", "");
}