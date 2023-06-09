// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  // Create the browser windo w.
  const unifiWindow = new BrowserWindow({
    width: 2000,
    height: 2000,
    icon: path.join("picture/iconbiostar.ico"),
    backgroundColor: '#2e2c29',
    fullscreen: false,
    maximizable: true,
    title: "Add BioStar 2",
    webPreferences: {
      //preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: false,
      allowDisplayingInsecureContent: true,
      allowRunningInsecureContent: true
    }
  })
  // and load the index.html of the app.
  unifiWindow.loadFile('index.html');
  //unifiWindow.loadURL('https://unifi.abcbakery.cloud/');
}

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  // Prevent having error
  event.preventDefault()
  // and continue
  callback(true)

})

app.commandLine.appendSwitch('ignore-certificate-errors');

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
