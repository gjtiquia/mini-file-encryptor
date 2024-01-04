import { useState } from "react";
import { Header } from "./Header";
import { ChooseFolderButton } from "./ChooseFolderButton";
import { PasswordInput } from "./PasswordInput";
import { EncryptButton } from "./EncryptButton";

export const App = () => {
    const [directoryPath, setDirectoryPath] = useState("");
    const [password, setPassword] = useState("");

    return <div className="bg-slate-800 h-full p-3 flex flex-col items-center justify-center gap-5">
        <Header />

        <ChooseFolderButton onFolderChanged={setDirectoryPath} />
        <p className="text-slate-200">Path: {directoryPath}</p>

        <PasswordInput onChanged={setPassword} value={password} />

        <EncryptButton password={password} inputPath={directoryPath} />
    </div>;
}