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
        {isEnabled() ?
            <button
                className="text-slate-200 bg-slate-600 hover:bg-slate-700 active:bg-slate-900 px-10 py-1 rounded-lg font-bold"
                onClick={onClickAsync}
            >
                Encrypt
            </button>
            :
            <button
                className="text-slate-500 bg-slate-700 opacity-50 px-10 py-1 rounded-lg font-bold"
            >
                Encrypt
            </button>
        }
    </>
}