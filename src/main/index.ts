import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain, nativeImage, shell, Tray } from 'electron'
import { menubar } from 'menubar'
import path, { join } from 'path'
import { INDEX_HTML_PATH } from './constants'
import { addContextmenu } from './menu'

function createWindow(): void {
  // Create the browser window.
  const mb = menubar({
    index: is.dev ? process.env['ELECTRON_RENDERER_URL'] : INDEX_HTML_PATH,
    tray: new Tray(
      nativeImage.createFromPath(path.join(__dirname, '../../build/menubar-icon.png'))
    ),
    showOnAllWorkspaces: false,
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
        sandbox: false,
        devTools: true
      }
    }
  })

  mb.on('ready', () => {
    addContextmenu(mb)
  })

  app.on('open-url', (event, url) => {
    event.preventDefault()
    const authCode = new URL(url).searchParams.get('accessToken')

    if (authCode) {
      mb.showWindow()
      mb.window?.webContents.send('oauth-code', authCode)
    }
  })
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

  ipcMain.on('open-url', (_, url: string) => {
    shell.openExternal(url)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.setAsDefaultProtocolClient('quicknotion')

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
