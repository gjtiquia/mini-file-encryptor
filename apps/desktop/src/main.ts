import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { encryptAsync, decryptAsync } from "core";
import { IPCRendererEvent } from './@types/events';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
        mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    }

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    ipcMain.handle(IPCRendererEvent.StartEncryption, (e, password: string, inputPath: string) => encryptAsync(password, inputPath, getEncryptOutputPathFromInputPath(inputPath)))
    ipcMain.handle(IPCRendererEvent.StartDecryption, (e, password: string, inputPath: string) => decryptAsync(password, inputPath, getDecryptOutputPathFromInputPath(inputPath)))

    createWindow();

    app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS. 
// There, it's common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

function getEncryptOutputPathFromInputPath(inputPath: string) {
    return `${inputPath}.encrypted`
}

function getDecryptOutputPathFromInputPath(inputPath: string) {
    return inputPath.replace(".encrypted", "");
}



