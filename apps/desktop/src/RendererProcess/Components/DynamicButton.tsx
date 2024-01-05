import { useState } from "react";
import { TabState } from "./TabBar"

interface IDynamicButtonProps {
    tab: TabState,
    isEnabled: boolean,
    onClickAsync: () => Promise<void>;
}

export const DynamicButton = (props: IDynamicButtonProps) => {

    const [isLoading, setIsLoading] = useState(false);

    function isEnabled() {
        if (isLoading)
            return false;

        return props.isEnabled;
    }

    async function onClickAsync() {
        setIsLoading(true);

        await props.onClickAsync();

        setIsLoading(false);
    }

    function getButtonText(): string {
        if (isLoading)
            return "Loading..."

        return props.tab;
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
            {getButtonText()}
        </button>
    </>
}