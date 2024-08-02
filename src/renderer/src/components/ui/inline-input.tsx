import { cn } from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'

export interface InlineInputProps {
  value: string | undefined
  onChange: (value: string) => void
  editable?: boolean
  placeholder?: string
  endContent?: React.ReactNode
  className?: string
  customEditing?: boolean
}

export const InlineInput = ({
  value,
  onChange,
  placeholder,
  endContent,
  className,
  customEditing = false
}: InlineInputProps) => {
  const [isEditing, setIsEditing] = useState(customEditing)
  const [inputValue, setInputValue] = useState(value || '')
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (customEditing) {
      setIsEditing(true)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    } else {
      setIsEditing(false)
    }
  }, [customEditing])

  useEffect(() => {
    setInputValue(value || '')
  }, [value])

  const handleEdit = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation()

    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const handleSave = () => {
    setIsEditing(false)
    onChange(inputValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('keydown', e.key)

    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setInputValue(value || '')
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

  return (
    <div ref={containerRef} className="inline-block w-full">
      <span
        ref={inputRef}
        className={cn(
          "cursor-pointer hover:bg-default-100 p-1 rounded-md transition-all duration-200 w-full inline-flex items-center justify-between group inline-input group-data-[state='open']:bg-gray-100 dark:group-data-[state='open']:bg-zinc-900 text-base outline-0 dark:outline-zinc-700 focus:bg-gray-100 dark:focus:bg-zinc-900",
          !inputValue && placeholder && 'text-default-500',
          endContent && 'pr-1.5',
          className
        )}
        onClick={handleEdit}
        contentEditable={isEditing}
        onChange={(e) => setInputValue(e.currentTarget.textContent || '')}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
      >
        {inputValue || placeholder}
        <div className="flex items-center justify-center group-hover:opacity-100 opacity-0 transition-all duration-100">
          {endContent}
        </div>
      </span>
    </div>
  )
}
