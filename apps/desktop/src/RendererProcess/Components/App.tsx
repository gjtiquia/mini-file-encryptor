import { useState } from "react";
import { Header } from "./Header";
import { ChooseFolderButton } from "./ChooseFolderButton";
import { PasswordInput } from "./PasswordInput";
import { EncryptButton } from "./EncryptButton";

type TabState = "Encrypt" | "Decrypt";

export const App = () => {
    const [directoryPath, setDirectoryPath] = useState("");
    const [password, setPassword] = useState("");
    const [tabState, setTabState] = useState<TabState>("Encrypt");

    function toggleTab() {
        switch (tabState) {
            case "Encrypt": setTabState("Decrypt"); return;
            case "Decrypt": setTabState("Encrypt"); return;
        }
    }

    return <div className="bg-slate-800 h-full p-3 flex flex-col items-center justify-center gap-12">
        <Header />

        <div className="flex gap-16">
            <button
                className="
                    text-slate-500 text-lg border-slate-300
                    disabled:text-slate-300 disabled:font-bold disabled:border-b-2
                "
                disabled={tabState === "Encrypt"}
                onClick={toggleTab}
            >
                Encrypt
            </button>

            <div className="border-2 border-slate-500" ></div>

            <button
                className="
                    text-slate-500 text-lg border-slate-300
                    disabled:text-slate-300 disabled:font-bold disabled:border-b-2
                "
                disabled={tabState === "Decrypt"}
                onClick={toggleTab}
            >
                Decrypt
            </button>
        </div>


        <div className="flex flex-col items-center justify-center gap-5">
            {/* TODO: Dragzone! Ref: https://www.youtube.com/watch?v=W73SFdpQN5I&ab_channel=tylerlaceby */}

            <ChooseFolderButton onPathChanged={setDirectoryPath} path={directoryPath} />
            <PasswordInput onChanged={setPassword} value={password} />
        </div>

        {tabState !== "Encrypt" ? null :
            <EncryptButton password={password} inputPath={directoryPath} />
        }

        {tabState !== "Decrypt" ? null :
            <p> Decrypt Button </p>
        }

    </div>;
}