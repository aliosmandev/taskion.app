import { NavigationBar } from '@renderer/components/navigation'
import { PageRenderer } from '@renderer/components/task-managment/page-renderer'

export const Home = () => {
  return (
    <div className="flex flex-col gap-y-2 w-full relative">
      <NavigationBar />
      <PageRenderer />
    </div>
  )
}
