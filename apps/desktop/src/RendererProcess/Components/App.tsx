import { useState } from "react";

export const App = () => {
    const [directoryPath, setDirectoryPath] = useState("");
    const [password, setPassword] = useState("");

    function onPassworkInputChanged(passwordInput: string) {
        // console.log(`Password: ${passwordInput}`);
        setPassword(passwordInput);
    }

    async function onChooseFolderClickedAsync() {
        const directoryPath = await window.electronAPI.openDirectory();

        console.log(`Directory Path: ${directoryPath}`);
        setDirectoryPath(directoryPath);
    }

    async function onEncryptClicked() {
        // TODO : isLoading

        if (directoryPath === "" || directoryPath === undefined)
            return;

        console.log(`Encrypting ${directoryPath}...`);
        window.electronAPI.encryptAsync(password, directoryPath);
    }

    return <div className="bg-slate-800 h-full p-3 flex flex-col items-center justify-center gap-5">
        <h1 className="font-bold text-4xl text-slate-200">
            Mini File Encryptor
        </h1>

        <p className="text-slate-200">
            // TODO : Encrypt/Decrypt Tab
        </p>

        <p className="text-slate-200">
            // TODO : Drag and drop file into space
        </p>

        <p className="text-slate-200">
            // TODO : Allow to choose folder via main process using IPC (browser API does not allow folders)
            {/* Ref: https://www.electronjs.org/docs/latest/tutorial/ipc#1-listen-for-events-with-ipcmainhandle */}
            {/* Ref: https://stackoverflow.com/questions/36152857/how-to-get-folder-filePath-using-electron */}
        </p>

        <button
            className="text-slate-200 bg-slate-600 hover:bg-slate-700 active:bg-slate-900 px-10 py-2 rounded-lg font-bold"
            onClick={onChooseFolderClickedAsync}
        >
            Choose Folder
        </button>

        <p className="text-slate-200">Path: {directoryPath}</p>

        <div className="flex w-full justify-center gap-3">
            <p className="text-slate-200">
                Password:
            </p>
            <input
                type="password"
                className="block border w-3/12 rounded-lg cursor-pointer focus:outline-none text-slate-200 bg-slate-700 border-slate-600 placeholder-slate-400"
                onChange={(e) => onPassworkInputChanged(e.target.value)}
            />
        </div>


        <button
            className="text-slate-200 bg-slate-600 hover:bg-slate-700 active:bg-slate-900 px-10 py-2 rounded-lg font-bold"
            onClick={onEncryptClicked}
        >
            Encrypt
        </button>
    </div>;
}