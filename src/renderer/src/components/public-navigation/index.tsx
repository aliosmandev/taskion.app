import Logo from '@renderer/assets/logo.png'
import { Link } from 'react-router-dom'

export const PublicNavigation = () => {
  return (
    <div className="flex flex-wrap justify-between items-center border-zinc-100 dark:border-zinc-900 p-3 border-b w-full">
      <Link to="/">
        <img src={Logo} alt="logo" className="w-5 h-5" />
      </Link>
      {/* <div className="flex gap-x-1">
        <ChevronLeft className="cursor-pointer w-4 h-4 text-zinc-500" />
        <ChevronRight className="cursor-pointer w-4 h-4 text-zinc-500" />
      </div> */}
    </div>
  )
}
