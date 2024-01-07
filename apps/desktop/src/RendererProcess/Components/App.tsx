import { useState } from "react";
import { Header } from "./Header";
import { ChoosePathButton } from "./ChoosePathButton";
import { PasswordInput } from "./PasswordInput";
import { TabBar, TabState } from "./TabBar";
import { DynamicButton } from "./DynamicButton";
import { ErrorMessage } from "./ErrorMessage";
import { SuccessMessage } from "./SuccessMessage";
import { version } from "../../../package.json"

export const App = () => {
    const [path, setPath] = useState("");
    const [password, setPassword] = useState("");
    const [tab, setTab] = useState<TabState>("Encrypt");

    const [isShowingError, setIsShowingError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [isShowingSuccess, setIsShowingSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    function toggleTab() {
        setPath("");
        setPassword("");
        hideError();
        hideSuccess();

        switch (tab) {
            case "Encrypt": setTab("Decrypt"); return;
            case "Decrypt": setTab("Encrypt"); return;
        }
    }

    function onPathChanged(value: string) {
        hideError();
        hideSuccess();

        setPath(value);
    }

    function onPasswordChanged(value: string) {
        hideSuccess();

        setPassword(value);
    }

    function showError(message: string) {
        setErrorMessage(message);
        setIsShowingError(true);
    }

    function hideError() {
        setIsShowingError(false);
    }

    function showSuccess(message: string) {
        setSuccessMessage(message);
        setIsShowingSuccess(true);
    }

    function hideSuccess() {
        setIsShowingSuccess(false);
    }

    async function OnButtonClickAsync() {
        hideError();
        hideSuccess();

        if (tab === "Encrypt") {
            const result = await window.electronAPI.encryptAsync({ password: password, inputPath: path })

            if (result.error)
                showError(result.error)
            else
                showSuccess(`Successfully encrypted to '${result.encryptedFilePath}'`);
        }

        else if (tab === "Decrypt") {
            const result = await window.electronAPI.decryptAsync({ password: password, inputPath: path })

            if (result.error)
                showError(result.error)
            else
                showSuccess(`Successfully decrypted to '${result.decryptedDirectoryPath}'`);
        }
    }

    function isButtonEnabled(): boolean {
        const fieldsComplete = password && path;
        if (!fieldsComplete)
            return false;

        const extension = path.split(".").pop();
        if (tab === "Decrypt" && extension !== "encrypted")
            return false;

        return true;
    }

    return <div className="bg-slate-800 p-1.5 h-full flex flex-col">
        <div className="flex-grow flex flex-col items-center justify-center gap-12">
            <Header />

            <TabBar tab={tab} onToggleTab={toggleTab} />

            <div className="flex flex-col items-center justify-center gap-5">
                <ChoosePathButton tab={tab} onPathChanged={onPathChanged} path={path} />
                <PasswordInput onChanged={onPasswordChanged} value={password} />
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
                <DynamicButton tab={tab} isEnabled={isButtonEnabled()} onClickAsync={OnButtonClickAsync} />

                <ErrorMessage isShowingError={isShowingError} errorMessage={errorMessage} />
                <SuccessMessage isShowingSuccess={isShowingSuccess} successMessage={successMessage} />
            </div>
        </div >

        <p className="self-end text-slate-600">
            v{version}
        </p>
    </div>
}