import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain } from 'electron'
import { menubar } from 'menubar'
import { join } from 'path'
import { INDEX_HTML_PATH } from './constants'
import { addContextmenu } from './menu'

function createWindow(): void {
  // Create the browser window.
  const mb = menubar({
    index: is.dev ? process.env['ELECTRON_RENDERER_URL'] : INDEX_HTML_PATH,
    showOnAllWorkspaces: false,
    icon: join(__dirname, '..', '..', '..', 'resources', 'icon.png'),
    browserWindow: {
      closable: true,
      fullscreenable: false,
      resizable: false,
      backgroundColor: '#FFFFFF',
      width: 500,
      height: 600,
      minWidth: 300,
      maxHeight: 900,
      minHeight: 600,
      webPreferences: {
        backgroundThrottling: false,
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    }
  })

  mb.on('ready', () => {
    addContextmenu(mb)
  })

  // mb.on('after-create-window', () => {
  //   const loadURL =
  //     is.dev && process.env['ELECTRON_RENDERER_URL']
  //       ? process.env['ELECTRON_RENDERER_URL']
  //       : INDEX_HTML_PATH

  //   mb.window?.loadURL(loadURL)
  // })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.quicknotion')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
