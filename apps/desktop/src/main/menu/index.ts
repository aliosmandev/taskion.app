import { Menu, MenuItemConstructorOptions } from 'electron'
import { Menubar } from 'menubar'

export function addContextmenu(mb: Menubar) {
  const template = [
    {
      label: `Open Taskion`,
      click: () => mb?.window?.show()
    },
    { type: 'separator' },
    {
      label: 'Toggle Dev Tools',
      click: () => mb?.window?.webContents.openDevTools()
    },
    { type: 'separator' },

    { label: 'Quit', role: 'quit' }
  ]

  mb?.tray?.on('right-click', function () {
    const contextMenu = Menu.buildFromTemplate(template as MenuItemConstructorOptions[])
    Menu.setApplicationMenu(contextMenu)
    mb?.tray?.popUpContextMenu(contextMenu)
  })
}
