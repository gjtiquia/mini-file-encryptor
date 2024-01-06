// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { IPCRendererEvent } from "./@types/enums";
import { IDecryptResult, IEncryptResult } from "core";

export const ELECTRON_API = {
    openDialogAsync: (params: IOpenDialogParams): Promise<IOpenDialogResult> => ipcRenderer.invoke(IPCRendererEvent.OpenDialogAsync, params),
    encryptAsync: (params: IEncryptParams): Promise<IEncryptResult> => ipcRenderer.invoke(IPCRendererEvent.EncryptAsync, params),
    decryptAsync: (params: IDecryptParams): Promise<IDecryptResult> => ipcRenderer.invoke(IPCRendererEvent.DecryptAsync, params),
}

contextBridge.exposeInMainWorld("electronAPI", ELECTRON_API)

