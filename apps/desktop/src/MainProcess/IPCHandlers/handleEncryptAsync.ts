import { IpcMainInvokeEvent, shell } from 'electron';
import { IEncryptResult, encryptAsync } from "core";
import { sleepAsync } from '../../utils/sleep';

export async function handleEncryptAsync(e: IpcMainInvokeEvent, params: IEncryptParams): Promise<IEncryptResult> {
    if (!params.password || !params.inputPath)
        return { error: `Invalid password and/or input path!` };

    // Mock takes time to encrypt
    // await sleepAsync(1000);

    const outputPath = getEncryptOutputPath(params.inputPath);
    const result = await encryptAsync(params.password, params.inputPath, outputPath);

    if (!result.error && result.encryptedFilePath)
        shell.showItemInFolder(result.encryptedFilePath);

    return result;
}

function getEncryptOutputPath(inputPath: string) {
    return `${inputPath}.encrypted`
}