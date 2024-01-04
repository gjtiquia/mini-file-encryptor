import { useState } from "react";
import { Header } from "./Header";
import { ChoosePathButton } from "./ChoosePathButton";
import { PasswordInput } from "./PasswordInput";
import { TabBar, Tab } from "./TabBar";
import { DynamicButton } from "./DynamicButton";


export const App = () => {
    const [path, setPath] = useState("");
    const [password, setPassword] = useState("");
    const [tab, setTab] = useState<Tab>("Encrypt");

    function toggleTab() {
        setPath("");
        setPassword("");

        switch (tab) {
            case "Encrypt": setTab("Decrypt"); return;
            case "Decrypt": setTab("Encrypt"); return;
        }
    }

    return <div className="bg-slate-800 h-full p-3 flex flex-col items-center justify-center gap-12">
        <Header />

        <TabBar tab={tab} onToggleTab={toggleTab} />

        <div className="flex flex-col items-center justify-center gap-5">
            {/* TODO: Dragzone! Ref: https://www.youtube.com/watch?v=W73SFdpQN5I&ab_channel=tylerlaceby */}

            <ChoosePathButton tab={tab} onPathChanged={setPath} path={path} />
            <PasswordInput onChanged={setPassword} value={password} />
        </div>

        <DynamicButton tab={tab} password={password} path={path} />
    </div>;
}