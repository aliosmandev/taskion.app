import { Button, Select, SelectItem } from '@nextui-org/react'
import { Separator } from '@radix-ui/react-context-menu'
import { PublicNavigation } from '@renderer/components/public-navigation'
import usePreferences from '@renderer/contexts/usePreferences'

const fontSizes = [
  {
    name: 'xs',
    size: '10px',
    value: 'size-xs'
  },
  {
    name: 'md',
    size: '12px',
    value: 'size-md'
  },
  {
    name: 'lg',
    size: '14px',
    value: 'size-lg'
  }
]

export const Settings = () => {
  const { preferences, updatePreferences } = usePreferences()

  const handleThemeChange = (theme: string) => {
    updatePreferences({ theme })
  }

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updatePreferences({ font: event.target.value })
  }

  const handleFontSizeChange = (fontSize: string) => {
    updatePreferences({ fontSize })
  }

  return (
    <div className="flex flex-col gap-y-2 w-full">
      <PublicNavigation />
      <div className="flex flex-col gap-y-2 px-3 py-1">
        <div className="flex flex-col gap-y-0">
          <h2 className="text-lg font-medium">Appearance</h2>
          <p className="text-xs text-gray-500">
            Customize the appearance, font size and color mode of the application font
          </p>
        </div>
        <Separator className="w-full h-[1px] bg-gray-100 dark:bg-zinc-900" />
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col gap-y-2">
            <span className="text-sm font-medium">Font</span>
            <Select
              placeholder="Select a font"
              className="max-w-xs"
              size="sm"
              variant="faded"
              selectedKeys={[preferences.font]}
              onChange={handleFontChange}
            >
              <SelectItem key="inter" value="inter">
                Inter
              </SelectItem>
              <SelectItem key="roboto" value="roboto">
                Roboto
              </SelectItem>
              <SelectItem key="montserrat" value="montserrat">
                Montserrat
              </SelectItem>
            </Select>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="text-sm font-medium">Font Size</span>
            <div className="flex gap-x-2">
              {fontSizes.map(({ name, size }) => (
                <Button
                  key={name}
                  size="sm"
                  className="h-7 min-w-12"
                  style={{ fontSize: `${size}` }}
                  onClick={() => handleFontSizeChange(name)}
                  color={preferences.fontSize === name ? 'primary' : 'default'}
                >
                  {name}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="text-sm font-medium">Theme</span>
            <div className="grid max-w-md grid-cols-2 gap-4">
              <div className="flex flex-col">
                <div
                  className={`items-center rounded-md border-2 border-muted p-1 hover:border-gray-400 hover:text-gray-400 transition-all duration-200 cursor-pointer ${
                    preferences.theme === 'light' ? 'border-gray-400' : ''
                  }`}
                  onClick={() => handleThemeChange('light')}
                >
                  <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                    <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                      <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                  </div>
                </div>
                <span className="block w-full p-2 text-center font-normal text-sm">Light</span>
              </div>
              <div className="flex flex-col">
                <div
                  className={`items-center rounded-md border-2 border-muted bg-popover p-1 transition-all duration-200 hover:border-gray-400 hover:text-gray-400 cursor-pointer ${
                    preferences.theme === 'dark' ? 'border-gray-400' : ''
                  }`}
                  onClick={() => handleThemeChange('dark')}
                >
                  <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                    <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                      <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-slate-400" />
                      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-slate-400" />
                      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                  </div>
                </div>
                <span className="block w-full p-2 text-center font-normal text-sm">Dark</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
