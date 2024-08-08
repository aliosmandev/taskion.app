import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { useAuthContext } from '@renderer/contexts/useAuth'
import { AUTHORIZE_URL } from '@renderer/utils/constants'
import { FolderSync, HelpCircle, Loader2, LogOutIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export const UserProfile = () => {
  const { user, logout } = useAuthContext()

  const [loading, setLoading] = useState(false)

  const handleSync = () => {
    setLoading(true)
    window.electron.ipcRenderer.send('open-url', AUTHORIZE_URL)
  }

  useEffect(() => {
    window.electron.ipcRenderer.on('opened-url', () => {
      setLoading(false)
    })
  }, [])

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          as="button"
          name={user?.name}
          showFallback
          src={user?.avatar_url}
          size="sm"
          radius="sm"
          classNames={{
            base: 'w-[24px] h-[24px] text-tiny select-none'
          }}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-medium">Signed in as</p>
          <p className="font-medium">{user?.name}</p>
        </DropdownItem>
        <DropdownItem key="sync" onClick={handleSync}>
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin inline-block mr-2" />
          ) : (
            <FolderSync className="w-4 h-4 text-zinc-500 inline-block mr-2" />
          )}
          Sync new pages
        </DropdownItem>
        <DropdownItem key="help_and_feedback">
          <HelpCircle className="w-4 h-4 text-zinc-500 inline-block mr-2" />
          Help & Feedback
        </DropdownItem>
        <DropdownItem key="logout" color="danger" className="text-red-500" onClick={logout}>
          <LogOutIcon className="w-4 h-4 text-red-500 inline-block mr-2" />
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
