import { IpcMainInvokeEvent, shell } from "electron";
import path from "path"
import { IDecryptResult, decryptAsync } from "core";
import { sleepAsync } from '../../utils/sleep';

export async function handleDecryptAsync(e: IpcMainInvokeEvent, params: IDecryptParams): Promise<IDecryptResult> {
    if (!hasCorrectExtension(params.inputPath))
        return { error: `Input path ${params.inputPath} does not have the extension '.encrypted'!` };

    // Mock takes time to encrypt
    // await sleepAsync(1000);

    const outputPath = getDecryptOutputPath(params.inputPath);
    const result = await decryptAsync(params.password, params.inputPath, outputPath);

    if (!result.error && result.decryptedDirectoryPath)
        shell.showItemInFolder(result.decryptedDirectoryPath);

    return result;
}

function hasCorrectExtension(inputPath: string): boolean {
    return path.extname(inputPath) === ".encrypted"
}

function getDecryptOutputPath(inputPath: string) {
    return inputPath.replace(".encrypted", "");
}