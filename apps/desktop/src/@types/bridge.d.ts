import { CORE } from "src/preload";

declare global {
    interface Window {
        core: typeof CORE
    }
}