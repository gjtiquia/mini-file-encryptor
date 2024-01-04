import { dialog, IpcMainInvokeEvent } from 'electron';

export async function handleDialogOpenDirectoryAsync(e: IpcMainInvokeEvent) {
    const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ["openDirectory"] })
    if (!canceled) {
        return filePaths[0]
    }
}