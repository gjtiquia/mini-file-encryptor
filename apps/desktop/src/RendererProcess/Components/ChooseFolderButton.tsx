import { useState } from "react";

interface IChooseFolderButtonProps {
    onPathChanged: (value: string) => void
    path: string
}

export const ChooseFolderButton = (props: IChooseFolderButtonProps) => {

    const [folderName, setFolderName] = useState("");
    const [isShowingName, setIsShowingName] = useState(true);

    async function onChooseFolderClickedAsync() {
        const { path, name } = await window.electronAPI.openDirectory();

        props.onPathChanged(path);
        setFolderName(name);
    }

    function hasPath(): boolean {
        if (props.path)
            return true;

        return false;
    }

    function getTextValue(): string {
        if (!hasPath())
            return "No folder selected.";

        return isShowingName ? folderName : props.path;
    }

    return <>
        <div className="flex items-center gap-2 w-fit overflow-clip">
            <div className="rounded-lg bg-slate-900">
                <button
                    className="px-4 rounded-lg min-w-fit text-slate-200 bg-slate-600 hover:bg-slate-700 active:bg-slate-900 "
                    onClick={onChooseFolderClickedAsync}
                >
                    Choose Folder
                </button>

                <input
                    readOnly
                    className="px-2 w-48 text-nowrap resize-none rounded-lg text-slate-200 bg-slate-900"
                    value={getTextValue()}
                />
            </div>

            {!hasPath() ? null :
                <button
                    className="text-nowrap text-slate-500 hover:text-slate-400"
                    onClick={() => setIsShowingName(!isShowingName)}
                >
                    {isShowingName ? "Show Path" : "Show Name"}
                </button>
            }
        </div>
    </>
}