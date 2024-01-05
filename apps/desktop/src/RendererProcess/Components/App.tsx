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

    function toggleTab() {
        setPath("");
        setPassword("");
        hideError();

        switch (tab) {
            case "Encrypt": setTab("Decrypt"); return;
            case "Decrypt": setTab("Encrypt"); return;
        }
    }

    function showError(message: string) {
        setErrorMessage(message);
        setIsShowingError(true);
    }

    function hideError() {
        setIsShowingError(false);
    }

    async function OnButtonClickAsync() {
        hideError();

        if (tab === "Encrypt") {
            await window.electronAPI.encryptAsync({ password: password, inputPath: path })
        }

        else if (tab === "Decrypt") {
            const result = await window.electronAPI.decryptAsync({ password: password, inputPath: path })

            if (result.error)
                showError(result.error)
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
            <ChoosePathButton tab={tab} onPathChanged={setPath} path={path} />
            <PasswordInput onChanged={setPassword} value={password} />

            {isShowingError &&
                <span className="text-red-500 text-center">
                    {errorMessage}
                </span>
            }
        </div>

        <DynamicButton tab={tab} isEnabled={isButtonEnabled()} onClickAsync={OnButtonClickAsync} />
    </div>;
}