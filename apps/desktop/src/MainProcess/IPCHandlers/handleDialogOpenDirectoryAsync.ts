import { dialog, IpcMainInvokeEvent } from "electron";
import path from "path"

export async function handleOpenDialogAsync(e: IpcMainInvokeEvent, params: IOpenDialogParams): Promise<IOpenDialogResult> {
    const { canceled, filePaths } = await dialog.showOpenDialog({ filters: params.filters, properties: params.properties })
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