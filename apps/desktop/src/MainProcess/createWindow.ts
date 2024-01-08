import { BrowserWindow, Menu } from 'electron';
import path from 'path';

export const createWindow = (rootDirectory: string) => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(rootDirectory, 'preload.js'),
        },
    });

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
        mainWindow.loadFile(path.join(rootDirectory, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    }

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    // Hides the top menu bar for Windows
    // Apparently does not affect MacOS
    mainWindow.setMenuBarVisibility(false);

    // Custom menu bar for MacOS since cannot hide
    Menu.setApplicationMenu(Menu.buildFromTemplate([

        // https://www.electronjs.org/docs/latest/api/menu#examples
        { role: "appMenu" },
        {
            label: 'View',
            submenu: [
                // { role: 'reload' },
                // { role: 'forceReload' },
                // { role: 'toggleDevTools' },
                // { type: 'separator' },
                // { role: 'resetZoom' },
                // { role: 'zoomIn' },
                // { role: 'zoomOut' },
                // { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },

        // https://www.electronjs.org/docs/latest/api/menu#standard-menus
        { role: "window" },
        { role: "help" },
        // { role: "services" } // appMenu should already have services
    ]));
};