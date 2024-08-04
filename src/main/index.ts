import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain, nativeTheme, shell, Tray } from 'electron'
import { Menubar, menubar } from 'menubar'
import { join } from 'path'
import { INDEX_HTML_PATH } from './constants'
import { addContextmenu } from './menu'
import { getTrayIcon, onThemeChange } from './menu/theme'

let mb: Menubar | null = null
const icon = getTrayIcon()

function createWindow(): void {
  mb = menubar({
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

  mb?.on('ready', () => {
    addContextmenu(mb!)
    nativeTheme.on('updated', () => {
      onThemeChange(mb!)
    })
  })

  // set tray & dock images here
  app.on('open-url', (event, url) => {
    event.preventDefault()
    const authCode = new URL(url).searchParams.get('accessToken')

    if (authCode) {
      mb?.showWindow()
      mb?.window?.webContents.send('oauth-code', authCode)
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
    mb?.window?.webContents.send('opened-url')
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
