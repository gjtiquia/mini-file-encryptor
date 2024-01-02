import { createRoot } from 'react-dom/client';

// https://react.dev/learn/add-react-to-an-existing-project#step-2-render-react-components-anywhere-on-the-page
const root = createRoot(document.getElementById('app'));
root.render(<h2>Hello from React!</h2>);
