import { ELECTRON_API } from "src/preload";

declare global {
    interface Window {
        electronAPI: typeof ELECTRON_API
    }
}