import { useState } from "react";
import { TabState } from "./TabBar";

interface IChoosePathButtonProps {
    onPathChanged: (value: string) => void,
    path: string,
    tab: TabState
}

export const ChoosePathButton = (props: IChoosePathButtonProps) => {

    const [name, setName] = useState("");
    const [isShowingName, setIsShowingName] = useState(true);

    async function onChoosePathClickedAsync() {
        const params: IOpenDialogParams = {}

        if (props.tab === "Encrypt") {
            params.properties = ["openDirectory"]
        }
        else if (props.tab === "Decrypt") {
            params.filters = [{ name: "Encrypted Files", extensions: ["encrypted"] }]
            params.properties = ["openFile"]
        }

        const { path, name } = await window.electronAPI.openDialogAsync(params);

        props.onPathChanged(path);
        setName(name);
    }

    function hasPath(): boolean {
        if (props.path)
            return true;

        return false;
    }

    function getTextValue(): string {
        if (!hasPath())
            return props.tab === "Encrypt" ? "No folder selected" : "No file selected";

        return isShowingName ? name : props.path;
    }

    return <>
        <div className="flex flex-nowrap items-center gap-2 w-fit overflow-clip rounded-lg bg-slate-900">
            <button
                className="px-4 py-1 rounded-lg min-w-fit text-slate-200 bg-slate-600 hover:bg-slate-500 active:bg-slate-700 "
                onClick={onChoosePathClickedAsync}
            >
                {props.tab === "Encrypt" ? "Choose Folder" : "Choose File"}
            </button>

            {hasPath() &&
                <button
                    className="text-nowrap text-slate-500 hover:text-slate-400 active:text-slate-600"
                    onClick={() => setIsShowingName(!isShowingName)}
                >
                    {isShowingName ? "Name: " : "Path: "}
                </button>
            }

            <input
                readOnly
                className="py-1 w-56 text-nowrap resize-none rounded-lg text-slate-200 bg-slate-900"
                value={getTextValue()}
            />
        </div>
    </>
}