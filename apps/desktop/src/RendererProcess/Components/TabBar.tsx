export type Tab = "Encrypt" | "Decrypt";

interface ITabBarProps {
    tab: Tab
    onToggleTab: () => void
}

export const TabBar = (props: ITabBarProps) => {
    return <div className="flex gap-16">
        <button
            className="
                    text-slate-500 text-lg border-slate-300
                    disabled:text-slate-300 disabled:font-bold disabled:border-b-2
                "
            disabled={props.tab === "Encrypt"}
            onClick={props.onToggleTab}
        >
            Encrypt
        </button>

        <div className="border-2 border-slate-500" ></div>

        <button
            className="
                    text-slate-500 text-lg border-slate-300
                    disabled:text-slate-300 disabled:font-bold disabled:border-b-2
                "
            disabled={props.tab === "Decrypt"}
            onClick={props.onToggleTab}
        >
            Decrypt
        </button>
    </div>
}