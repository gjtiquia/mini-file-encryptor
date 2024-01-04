import { createRoot } from 'react-dom/client';
import { App } from './Components/App';

export function createAndRenderRoot() {
    // https://react.dev/learn/add-react-to-an-existing-project#step-2-render-react-components-anywhere-on-the-page

    const appElement = document.getElementById('app');

    if (appElement === null)
        throw new Error("Cannot find element with id 'app'!")

    const root = createRoot(appElement);
    root.render(<App />);
}

