import { IpcMainInvokeEvent, shell } from 'electron';
import { encryptAsync } from "core";
import { sleepAsync } from '../../utils/sleep';

export async function handleEncryptAsync(e: IpcMainInvokeEvent, params: IEncryptParams) {
    if (!params.password || !params.inputPath)
        return;

    // Mock takes time to encrypt
    // await sleepAsync(1000);

    const outputPath = getEncryptOutputPath(params.inputPath);
    const result = await encryptAsync(params.password, params.inputPath, outputPath);

    if (!result.error && result.encryptedFilePath)
        shell.showItemInFolder(result.encryptedFilePath);
}

function getEncryptOutputPath(inputPath: string) {
    return `${inputPath}.encrypted`
}