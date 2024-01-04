interface IPasswordInputProps {
    onChanged: (value: string) => void
    value: string
}

export const PasswordInput = (props: IPasswordInputProps) => {

    function onPassworkInputChanged(passwordInput: string) {
        props.onChanged(passwordInput);
    }

    return <div>
        <div className="flex w-max gap-3">
            <p className="text-slate-200">
                Password:
            </p>
            <input
                type="password"
                className="block border px-1 rounded-lg cursor-pointer focus:outline-none text-slate-200 bg-slate-700 border-slate-600 placeholder-slate-400"
                onChange={(e) => onPassworkInputChanged(e.target.value)}
                value={props.value}
            />
        </div>
        {/* <span className="text-red-500">
            Unable to decrypt. Are you sure you are using the correct password?
        </span> */}
    </div>
}