interface IChooseFolderButtonProps {
    onFolderChanged: (path: string) => void
}

export const ChooseFolderButton = (props: IChooseFolderButtonProps) => {

    async function onChooseFolderClickedAsync() {
        const path = await window.electronAPI.openDirectory();

        console.log(`Directory Path: ${path}`);
        props.onFolderChanged(path);
    }

    return <>
        <button
            className="text-slate-200 bg-slate-600 hover:bg-slate-700 active:bg-slate-900 px-10 py-2 rounded-lg font-bold"
            onClick={onChooseFolderClickedAsync}
        >
            Choose Folder
        </button>
    </>
}