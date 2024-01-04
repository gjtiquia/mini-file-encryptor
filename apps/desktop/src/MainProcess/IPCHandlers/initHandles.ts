import { ipcMain } from 'electron';
import { IPCRendererEvent } from '../../@types/enums';
import { handleEncryptAsync } from './handleEncryptAsync';
import { handleDecryptAsync } from './handleDecryptAsync';
import { handleOpenDialogAsync } from './handleDialogOpenDirectoryAsync';

export function initHandles() {
    ipcMain.handle(IPCRendererEvent.OpenDialogAsync, handleOpenDialogAsync)
    ipcMain.handle(IPCRendererEvent.EncryptAsync, handleEncryptAsync)
    ipcMain.handle(IPCRendererEvent.DecryptAsync, handleDecryptAsync)
}
