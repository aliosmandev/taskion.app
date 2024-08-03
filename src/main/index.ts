import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain, nativeImage, shell, Tray } from 'electron'
import { menubar } from 'menubar'
import { join } from 'path'
import { ICON_PATH_DEV, ICON_PATH_PROD, INDEX_HTML_PATH } from './constants'
import { addContextmenu } from './menu'

const iconPath = app.isPackaged ? ICON_PATH_PROD : ICON_PATH_DEV
const icon = nativeImage.createFromPath(iconPath)

function createWindow(): void {
  const mb = menubar({
    index: is.dev ? process.env['ELECTRON_RENDERER_URL'] : INDEX_HTML_PATH,
    tray: new Tray(icon),
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
      ipcMain.emit('opened-url')
    }
  })
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.quicknotion')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  ipcMain.on('open-url', (_, url: string) => {
    shell.openExternal(url)
    ipcMain.emit('opened-url')
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
