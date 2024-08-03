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

const useCalculateRows = (width: number) => {
  const dummyDivRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    dummyDivRef.current = document.createElement('div')
    dummyDivRef.current.style.width = `${width}px`
    dummyDivRef.current.style.visibility = 'hidden'
    dummyDivRef.current.style.whiteSpace = 'pre-wrap'
    dummyDivRef.current.style.wordWrap = 'break-word'
    dummyDivRef.current.style.position = 'absolute'
    dummyDivRef.current.style.pointerEvents = 'none'
    dummyDivRef.current.style.zIndex = '-9999'
    dummyDivRef.current.style.fontFamily = 'inherit'
    dummyDivRef.current.style.fontSize = 'inherit'
    dummyDivRef.current.style.lineHeight = 'inherit'
    document.body.appendChild(dummyDivRef.current)

    return () => {
      if (dummyDivRef.current) {
        document.body.removeChild(dummyDivRef.current)
      }
    }
  }, [width])

  const calculateRows = (text: string) => {
    if (dummyDivRef.current) {
      dummyDivRef.current.innerText = text
      const rows = dummyDivRef.current.clientHeight / 25 // 20 is an approximate line height
      return Math.ceil(rows)
    }
    return 1
  }

  return calculateRows
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
  const [rows, setRows] = useState(1)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const TEXTAREA_WIDTH = 450
  const calculateRows = useCalculateRows(TEXTAREA_WIDTH)

  useEffect(() => {
    if (customEditing) {
      setIsEditing(true)
      setTimeout(() => {
        inputRef.current?.focus()
        resizeTextarea()
      }, 100)
    } else {
      setIsEditing(false)
    }
  }, [customEditing])

  useEffect(() => {
    setInputValue(value || '')
    updateRows(value || '')
  }, [value])

  const handleEdit = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation()
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      resizeTextarea()
    }, 100)
  }

  const handleSave = () => {
    setIsEditing(false)
    onChange(inputValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setInputValue(value || '')
      updateRows(value || '')
    } else if (e.key === 'a' && e.metaKey) {
      e.preventDefault()
      inputRef.current?.select()
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

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
    updateRows(e.target.value)
    resizeTextarea()
  }

  const resizeTextarea = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
    }
  }

  const updateRows = (text: string) => {
    const calculatedRows = calculateRows(text)
    setRows(calculatedRows > 1 ? calculatedRows : 1)
  }

  useEffect(() => {
    resizeTextarea()
  }, [inputValue])

  return (
    <div ref={containerRef} className="inline-block w-full">
      {isEditing ? (
        <textarea
          ref={inputRef}
          value={inputValue}
          onChange={handleInput}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className={cn(
            "cursor-pointer hover:bg-default-100 p-1 mt-[3px] rounded-md transition-all duration-200 w-full inline-flex items-center justify-between group inline-input group-data-[state='open']:bg-gray-100 dark:group-data-[state='open']:bg-zinc-900 text-base outline-0 dark:outline-zinc-700 focus:bg-gray-100 dark:focus:bg-zinc-900 resize-none overflow-hidden",
            className
          )}
          style={{ overflow: 'hidden' }}
          rows={rows}
        />
      ) : (
        <span
          onClick={handleEdit}
          className={cn(
            "cursor-pointer hover:bg-default-100 p-1 rounded-md transition-all duration-200 w-full inline-flex items-center justify-between group inline-input group-data-[state='open']:bg-gray-100 dark:group-data-[state='open']:bg-zinc-900 text-base outline-0 dark:outline-zinc-700 focus:bg-gray-100 dark:focus:bg-zinc-900",
            !inputValue && placeholder && 'text-default-500',
            endContent && 'pr-1.5',
            className
          )}
        >
          {inputValue || placeholder}
          <div className="flex items-center justify-center group-hover:opacity-100 opacity-0 transition-all duration-100">
            {endContent}
          </div>
        </span>
      )}
    </div>
  )
}
