/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 */

import { createAndRenderRoot } from './RendererProcess';
import "./index.css"

// Add this to the end of the existing file
// https://www.electronforge.io/guides/framework-integration/react-with-typescript
createAndRenderRoot();
