import { cn } from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'

export interface InlineInputProps {
  defaultValue: string | undefined
  onChange: (value: string) => void
  editable?: boolean
  placeholder?: string
  className?: string
  customEditing?: boolean
}

export const InlineInput = ({
  defaultValue,
  onChange,
  placeholder,
  className,
  customEditing = false
}: InlineInputProps) => {
  const [isEditing, setIsEditing] = useState(customEditing)
  const [value, setValue] = useState(defaultValue || '')
  const [displayValue, setDisplayValue] = useState(defaultValue || '')
  const divRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (customEditing) {
      setIsEditing(true)
      setTimeout(() => {
        divRef.current?.focus()
      }, 100)
    } else {
      setIsEditing(false)
    }
  }, [customEditing])

  const handleEdit = () => {
    setIsEditing(true)
    setTimeout(() => {
      if (divRef.current) {
        divRef.current.focus()
      }
    }, 100)
  }

  const handleSave = () => {
    setIsEditing(false)
    onChange(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setDisplayValue(value || '')
    }
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      if (isEditing) {
        handleSave()
      }
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isEditing])

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setValue(e.currentTarget.textContent || '')
  }

  return (
    <div ref={containerRef} className="inline-block w-full relative">
      <div
        ref={divRef}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onInput={handleInput}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={cn(
          "cursor-pointer hover:bg-default-100 p-1 mt-[3px] rounded-md transition-all duration-200 w-full inline-flex items-center justify-between group inline-input group-data-[state='open']:bg-gray-100 dark:group-data-[state='open']:bg-zinc-900 text-sm outline-0 dark:outline-zinc-700 focus:bg-gray-100 dark:focus:bg-zinc-900",
          !displayValue && placeholder && 'text-default-500',
          className
        )}
        onClick={handleEdit}
        data-placeholder={placeholder}
      >
        {displayValue}
      </div>
      {!displayValue && !isEditing && placeholder && (
        <div
          className="absolute top-0 left-0 text-default-500 pointer-events-none"
          style={{ padding: '1px', marginTop: '3px' }}
        >
          {placeholder}
        </div>
      )}
    </div>
  )
}
