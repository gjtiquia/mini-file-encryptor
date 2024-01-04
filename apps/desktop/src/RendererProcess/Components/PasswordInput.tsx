interface IPasswordInputProps {
    onChanged: (value: string) => void
    value: string
}

export const PasswordInput = (props: IPasswordInputProps) => {

    function onPassworkInputChanged(passwordInput: string) {
        props.onChanged(passwordInput);
    }

    return <div className="flex w-full justify-center gap-3">
        <p className="text-slate-200">
            Password:
        </p>
        <input
            type="password"
            className="block border w-3/12 rounded-lg cursor-pointer focus:outline-none text-slate-200 bg-slate-700 border-slate-600 placeholder-slate-400"
            onChange={(e) => onPassworkInputChanged(e.target.value)}
            value={props.value}
        />
    </div>
}