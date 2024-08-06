import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { useAuthContext } from '@renderer/contexts/useAuth'

export const UserProfile = () => {
  const { user, logout } = useAuthContext()

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          as="button"
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
        {/* <DropdownItem key="settings" href="/settings">
          My Settings
        </DropdownItem> */}
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger" className="text-red-500" onClick={logout}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
