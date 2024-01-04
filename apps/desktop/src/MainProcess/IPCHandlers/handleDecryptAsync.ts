import { IpcMainInvokeEvent, shell } from "electron";
import path from "path"
import { decryptAsync } from "core";
import { sleepAsync } from '../../utils/sleep';

export async function handleDecryptAsync(e: IpcMainInvokeEvent, params: IDecryptParams) {
    if (!validateInputPath(params.inputPath))
        return;

    // Mock takes time to encrypt
    // await sleepAsync(1000);

    const outputPath = getDecryptOutputPath(params.inputPath);
    await decryptAsync(params.password, params.inputPath, outputPath);

    shell.showItemInFolder(outputPath);
}

function validateInputPath(inputPath: string): boolean {
    return path.extname(inputPath) === ".encrypted"
}

function getDecryptOutputPath(inputPath: string) {
    return inputPath.replace(".encrypted", "");
}