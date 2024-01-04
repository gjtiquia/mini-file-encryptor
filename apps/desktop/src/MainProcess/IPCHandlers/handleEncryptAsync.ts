import { IpcMainInvokeEvent, shell } from 'electron';
import { encryptAsync } from "core";
import { sleepAsync } from '../../utils/sleep';

export async function handleEncryptAsync(e: IpcMainInvokeEvent, params: IEncryptParams) {
    if (!params.password || !params.inputPath)
        return;

    // Mock takes time to encrypt
    // await sleepAsync(1000);

    const outputPath = getEncryptOutputPath(params.inputPath);
    await encryptAsync(params.password, params.inputPath, outputPath);

    shell.showItemInFolder(outputPath);
}

function getEncryptOutputPath(inputPath: string) {
    return `${inputPath}.encrypted`
}