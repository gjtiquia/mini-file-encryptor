import { app, BrowserWindow } from 'electron';
import { createWindow, initIPCHandlers } from './MainProcess';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

app.whenReady().then(() => {

    initIPCHandlers();

    createWindow(__dirname);

    app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow(__dirname);
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





