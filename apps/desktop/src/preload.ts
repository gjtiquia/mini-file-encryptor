// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { IPCRendererEvent } from "./@types/enums";

export const ELECTRON_API = {
    openDirectory: (): Promise<string> => ipcRenderer.invoke(IPCRendererEvent.DialogOpenDirectory),
    encryptAsync: (params: IEncryptParams): Promise<void> => ipcRenderer.invoke(IPCRendererEvent.EncryptAsync, params),
    decryptAsync: (params: IDecryptParams): Promise<void> => ipcRenderer.invoke(IPCRendererEvent.DecryptAsync, params),
}

contextBridge.exposeInMainWorld("electronAPI", ELECTRON_API)

