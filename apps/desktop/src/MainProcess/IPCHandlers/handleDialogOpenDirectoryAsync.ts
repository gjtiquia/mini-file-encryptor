import { dialog, IpcMainInvokeEvent } from "electron";
import path from "path"

export async function handleDialogOpenDirectoryAsync(e: IpcMainInvokeEvent): Promise<IOpenDirectoryResult> {
    const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ["openDirectory"] })
    if (canceled)
        return { isSuccess: false, path: "", name: "" }

    const directoryPath = filePaths[0]
    const baseName = path.basename(directoryPath);

    return {
        isSuccess: true,
        path: directoryPath,
        name: baseName
    }
}