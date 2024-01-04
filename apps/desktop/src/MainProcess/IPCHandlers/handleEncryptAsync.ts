import { IpcMainInvokeEvent, shell } from 'electron';
import { encryptAsync } from "core";

export async function handleEncryptAsync(e: IpcMainInvokeEvent, params: IEncryptParams) {
    if (!params.password || !params.inputPath)
        return;

    const outputPath = getEncryptOutputPath(params.inputPath);
    await encryptAsync(params.password, params.inputPath, outputPath);

    shell.showItemInFolder(outputPath);
}

function getEncryptOutputPath(inputPath: string) {
    return `${inputPath}.encrypted`
}