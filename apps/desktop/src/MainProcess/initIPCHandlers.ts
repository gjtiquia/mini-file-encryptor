import { dialog, ipcMain, IpcMainInvokeEvent } from 'electron';
import { encryptAsync, decryptAsync } from "core";
import { IPCRendererEvent } from '../@types/events';

export function initIPCHandlers() {
    ipcMain.handle(IPCRendererEvent.DialogOpenDirectory, onDialogOpenDirectoryAsync)
    ipcMain.handle(IPCRendererEvent.EncryptAsync, onEncryptAsync)
    ipcMain.handle(IPCRendererEvent.DecryptAsync, onDecryptAsync)
}

async function onDialogOpenDirectoryAsync(e: IpcMainInvokeEvent) {
    const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ["openDirectory"] })
    if (!canceled) {
        return filePaths[0]
    }
}

function onEncryptAsync(e: IpcMainInvokeEvent, password: string, inputPath: string) {
    const outputPath = getEncryptOutputPath(inputPath);
    encryptAsync(password, inputPath, outputPath);
}

function onDecryptAsync(e: IpcMainInvokeEvent, password: string, inputPath: string) {
    const outputPath = getDecryptOutputPath(inputPath);
    decryptAsync(password, inputPath, outputPath);
}

function getEncryptOutputPath(inputPath: string) {
    return `${inputPath}.encrypted`
}

function getDecryptOutputPath(inputPath: string) {
    return inputPath.replace(".encrypted", "");
}