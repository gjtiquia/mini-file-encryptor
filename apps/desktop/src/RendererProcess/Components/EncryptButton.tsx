interface IEncryptButtonProps {
    password: string,
    inputPath: string
}

export const EncryptButton = (props: IEncryptButtonProps) => {
    async function onClickAsync() {
        await window.electronAPI.encryptAsync({ password: props.password, inputPath: props.inputPath })
    }

    return <>
        <button
            className="text-slate-200 bg-slate-600 hover:bg-slate-700 active:bg-slate-900 px-10 py-1 rounded-lg font-bold"
            onClick={onClickAsync}
        >
            Encrypt
        </button>
    </>
}