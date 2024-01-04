import { useState } from "react";

interface IChooseFolderButtonProps {
    onPathChanged: (value: string) => void
    path: string
}

export const ChooseFolderButton = (props: IChooseFolderButtonProps) => {

    const [folderName, setFolderName] = useState("");

    async function onChooseFolderClickedAsync() {
        const { path, name } = await window.electronAPI.openDirectory();

        props.onPathChanged(path);
        setFolderName(name);
    }

    function getTextValue(): string {
        if (!props.path)
            return "No folder selected.";

        return props.path;
    }

    return <>
        <div className="flex items-center w-96 rounded-lg bg-slate-900 overflow-clip">
            <button
                className="px-4 rounded-lg min-w-fit text-slate-200 bg-slate-600 hover:bg-slate-700 active:bg-slate-900 "
                onClick={onChooseFolderClickedAsync}
            >
                Choose Folder
            </button>

            <input
                readOnly
                className="px-2 w-full text-nowrap resize-none text-slate-200 bg-slate-900"
                value={getTextValue()}
            />
        </div>
    </>
}