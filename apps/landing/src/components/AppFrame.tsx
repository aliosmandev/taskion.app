import clsx from 'clsx'

export function AppFrame({
  className,
  children,
  priority = false,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & { priority?: boolean }) {
  return (
    <div className={clsx('aspect-[366/777] relative', className)} {...props}>
      <div className="absolute inset-0 left-20 top-14 bg-white right-2 rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  )
}