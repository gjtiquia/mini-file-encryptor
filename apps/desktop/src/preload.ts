// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { IPCRendererEvent } from "./@types/events";

export const ELECTRON_API = {
    openDirectory: (): Promise<string> => ipcRenderer.invoke(IPCRendererEvent.DialogOpenDirectory),
    encryptAsync: (password: string, inputPath: string) => ipcRenderer.invoke(IPCRendererEvent.EncryptAsync, password, inputPath),
    decryptAsync: (password: string, inputPath: string) => ipcRenderer.invoke(IPCRendererEvent.DecryptAsync, password, inputPath),
}

contextBridge.exposeInMainWorld("electronAPI", ELECTRON_API)

