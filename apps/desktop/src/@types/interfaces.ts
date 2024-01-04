interface IEncryptParams {
    password: string,
    inputPath: string
}

interface IDecryptParams {
    password: string,
    inputPath: string
}

interface IOpenDirectoryResult {
    isSuccess: boolean,
    path: string,
    name: string
}