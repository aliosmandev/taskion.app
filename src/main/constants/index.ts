const path = require('path')

export const INDEX_HTML_PATH = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: path.resolve(__dirname, '..', 'renderer/index.html')
})
