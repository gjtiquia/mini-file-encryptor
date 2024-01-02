import { ipcMain, IpcMainInvokeEvent } from 'electron';
// import { encryptAsync, decryptAsync } from "core";
import { IPCRendererEvent } from '../@types/events';

export function initIPCHandlers() {
    ipcMain.handle(IPCRendererEvent.EncryptAsync, onEncryptAsync)
    ipcMain.handle(IPCRendererEvent.DecryptAsync, onDecryptAsync)
}

// TODO : Not sure why cannot create build when using local package...

function onEncryptAsync(e: IpcMainInvokeEvent, password: string, inputPath: string) {
    const outputPath = getEncryptOutputPath(inputPath);
    // encryptAsync(password, inputPath, outputPath);
}

function onDecryptAsync(e: IpcMainInvokeEvent, password: string, inputPath: string) {
    const outputPath = getDecryptOutputPath(inputPath);
    // decryptAsync(password, inputPath, outputPath);
}

function getEncryptOutputPath(inputPath: string) {
    return `${inputPath}.encrypted`
}

function getDecryptOutputPath(inputPath: string) {
    return inputPath.replace(".encrypted", "");
}