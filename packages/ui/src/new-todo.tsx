import { Input } from '@nextui-org/react'
import { Loader2Icon, PlusIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { usePagesContext } from './contexts/usePagesContext'

export const NewTodo = () => {
  const { handleNewBlock } = usePagesContext()
  const [newTodo, setNewTodo] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (newTodo.trim() === '') return
    setIsLoading(true)
    handleNewBlock(newTodo)
    setNewTodo('')
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
      setIsLoading(false)
    }, 100) // Simulate a delay for UI/UX purposes
  }

  return (
    <div className="flex gap-x-2 w-full items-center py-2">
      <Input
      classNames={{
        input: "!border-0 !outline-0 !ring-0"
      }}
        ref={inputRef}
        size="sm"
        placeholder="New todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit()
          }
        }}
        isDisabled={isLoading}
        endContent={
          isLoading ? (
            <Loader2Icon className="w-4 h-4 text-default-40 flex-shrink-0 animate-spin" />
          ) : (
            <PlusIcon
              className="w-4 h-4 text-default-400 flex-shrink-0 cursor-pointer"
              onClick={handleSubmit}
            />
          )
        }
      />
    </div>
  )
}