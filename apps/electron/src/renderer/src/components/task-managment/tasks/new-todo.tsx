import { Input } from '@nextui-org/react'
import { usePagesContext } from '@renderer/contexts/usePages'
import { createTodoBlock } from '@renderer/libs/api/blocks'
import { Loader2Icon, PlusIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

export const NewTodo = () => {
  const queryClient = useQueryClient()
  const { currentPage } = usePagesContext()
  const [newTodo, setNewTodo] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const { mutate, isLoading } = useMutation(
    () =>
      createTodoBlock(currentPage || '', {
        checked: false,
        text: newTodo
      }),
    {
      onSuccess: () => {
        setNewTodo('')
        queryClient.invalidateQueries(['blocks', currentPage])
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus()
          }
        }, 100)
      }
    }
  )

  const handleSubmit = () => {
    mutate()
  }

  return (
    <div className="flex gap-x-2 w-full items-center py-2">
      <Input
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
