import path from 'path'

export const ICON_PATH_DEV = path.join(__dirname, '..', '..', 'build', 'menubar-icon-dark.png')
export const ICON_PATH_PROD = path.join(process.resourcesPath, 'build', 'menubar-icon-dark.png')

export const DARK_ICON_PATH_DEV = path.join(__dirname, '..', '..', 'build', 'menubar-icon.png')
export const DARK_ICON_PATH_PROD = path.join(process.resourcesPath, 'build', 'menubar-icon.png')

export const INDEX_HTML_PATH = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: path.resolve(__dirname, '..', 'renderer/index.html')
})
