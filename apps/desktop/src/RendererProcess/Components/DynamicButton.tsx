import { TabState } from "./TabBar"

interface IDynamicButtonProps {
    tab: TabState,
    password: string,
    path: string
}

export const DynamicButton = (props: IDynamicButtonProps) => {

    function isEnabled() {
        const fieldsComplete = props.password && props.path;
        if (!fieldsComplete)
            return false;

        const extension = props.path.split(".").pop();
        if (props.tab === "Decrypt" && extension !== "encrypted")
            return false;

        return true;
    }

    async function onClickAsync() {
        if (props.tab === "Encrypt")
            await window.electronAPI.encryptAsync({ password: props.password, inputPath: props.path })

        else if (props.tab === "Decrypt")
            await window.electronAPI.decryptAsync({ password: props.password, inputPath: props.path })
    }

    return <>
        <button
            className="
                px-10 py-1 rounded-lg font-bold 
                text-slate-200 bg-slate-600 hover:bg-slate-700 active:bg-slate-900 
                disabled:text-slate-500 disabled:bg-slate-700 disabled:opacity-50
            "
            disabled={!isEnabled()}
            onClick={onClickAsync}
        >
            {props.tab}
        </button>
    </>
}