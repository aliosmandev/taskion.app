import { Checkbox, cn, Skeleton } from '@nextui-org/react'
import { InlineInput } from './inline-input'
import { useState } from 'react'
import { usePagesContext } from './contexts/usePagesContext'

export interface NodeItemType {
  blockId: string
  text: string | undefined
  completed: boolean | undefined
}

export const TodoItem = ({ blockId, text, completed }: NodeItemType) => {
  const [isCompleted, setIsCompleted] = useState(completed)
  const { handleUpdateBlock, handleDeleteBlock } = usePagesContext()
  const [isEditing, setIsEditing] = useState(false)

  const handleUpdateTodo = (blockId: string, checked?: boolean, content?: string) => {
    setIsCompleted(checked)
    handleUpdateBlock(blockId, checked, content)
    setIsEditing(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleDelete = () => {
    handleDeleteBlock(blockId)
  }

  return (
    <div className="flex w-full items-center group">
      <Checkbox
        className="mb-auto mt-0.5"
        id={blockId}
        key={blockId}
        defaultSelected={completed}
        onChange={() => handleUpdateTodo(blockId, !isCompleted)}
        lineThrough
        classNames={{
          base: 'pr-1.5'
        }}
      />
      <InlineInput
        defaultValue={text || ''}
        onChange={(value) => handleUpdateTodo(blockId, undefined, value)}
        placeholder="To-do"
        editable={true}
        customEditing={isEditing}
        className={cn({
          'line-through transition-all duration-200': isCompleted
        })}
      />
    </div>
  )
}

export const TodoLoader = () => {
  return (
    <div className="flex gap-x-2 w-full items-center py-0.5">
      <Skeleton className="h-6 w-6 rounded-md" />
      <Skeleton className="h-5 w-full rounded-md" />
    </div>
  )
}