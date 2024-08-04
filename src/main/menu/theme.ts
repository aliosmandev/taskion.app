import { app, nativeImage, nativeTheme } from 'electron'
import { Menubar } from 'menubar'
import {
  DARK_ICON_PATH_DEV,
  DARK_ICON_PATH_PROD,
  ICON_PATH_DEV,
  ICON_PATH_PROD
} from '../constants'

export const getTrayIcon = () => {
  const isDark = nativeTheme.shouldUseDarkColors
  return app.isPackaged
    ? nativeImage.createFromPath(isDark ? DARK_ICON_PATH_PROD : ICON_PATH_PROD)
    : nativeImage.createFromPath(isDark ? DARK_ICON_PATH_DEV : ICON_PATH_DEV)
}

export const onThemeChange = (mb: Menubar) => {
  const icon = getTrayIcon()

  mb?.tray?.setImage(icon)
}
