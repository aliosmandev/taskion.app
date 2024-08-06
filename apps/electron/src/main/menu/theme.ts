import { app, nativeImage } from 'electron'
import { Menubar } from 'menubar'
import { ICON_PATH_DEV, ICON_PATH_PROD } from '../constants'

export const getTrayIcon = () => {
  // const isDark = nativeTheme.shouldUseDarkColors
  // return app.isPackaged
  //   ? nativeImage.createFromPath(isDark ? DARK_ICON_PATH_PROD : ICON_PATH_PROD)
  //   : nativeImage.createFromPath(isDark ? DARK_ICON_PATH_DEV : ICON_PATH_DEV)
  const iconPath = app.isPackaged ? ICON_PATH_PROD : ICON_PATH_DEV

  return nativeImage.createFromPath(iconPath)
}

export const onThemeChange = (mb: Menubar) => {
  const icon = getTrayIcon()

  mb?.tray?.setImage(icon)
}
