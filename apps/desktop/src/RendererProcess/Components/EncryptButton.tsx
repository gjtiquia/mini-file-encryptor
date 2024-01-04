interface IEncryptButtonProps {
    password: string,
    inputPath: string
}

export const EncryptButton = (props: IEncryptButtonProps) => {

    function isEnabled() {
        return props.password && props.inputPath;
    }

    async function onClickAsync() {
        await window.electronAPI.encryptAsync({ password: props.password, inputPath: props.inputPath })
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
            Encrypt
        </button>
    </>
}