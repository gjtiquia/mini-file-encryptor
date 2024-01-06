import { useState } from "react";
import { Header } from "./Header";
import { ChoosePathButton } from "./ChoosePathButton";
import { PasswordInput } from "./PasswordInput";
import { TabBar, TabState } from "./TabBar";
import { DynamicButton } from "./DynamicButton";

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

    return <div className="bg-slate-800 h-full p-3 flex flex-col items-center justify-center gap-12">
        <Header />

        <TabBar tab={tab} onToggleTab={toggleTab} />

        <div className="flex flex-col items-center justify-center gap-5">
            <ChoosePathButton tab={tab} onPathChanged={onPathChanged} path={path} />
            <PasswordInput onChanged={onPasswordChanged} value={password} />

            {isShowingError &&
                <span className="text-red-500 text-center">
                    {errorMessage}
                </span>
            }

            {isShowingSuccess &&
                <span className="text-green-500 text-center">
                    {successMessage}
                </span>
            }
        </div>

        <DynamicButton tab={tab} isEnabled={isButtonEnabled()} onClickAsync={OnButtonClickAsync} />
    </div>;
}