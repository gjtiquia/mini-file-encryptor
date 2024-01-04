interface IEncryptParams {
    password: string,
    inputPath: string
}

interface IDecryptParams {
    password: string,
    inputPath: string
}

interface IOpenDialogParams {
    filters?: Electron.FileFilter[]
    properties?: Array<'openFile' | 'openDirectory' | 'multiSelections' | 'showHiddenFiles' | 'createDirectory' | 'promptToCreate' | 'noResolveAliases' | 'treatPackageAsDirectory' | 'dontAddToRecent'>
}

interface IOpenDialogResult {
    isSuccess: boolean,
    path: string,
    name: string
}