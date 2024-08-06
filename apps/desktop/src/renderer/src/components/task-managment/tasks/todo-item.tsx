import { Checkbox, cn, Skeleton } from '@nextui-org/react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from '@renderer/components/ui/context-menu'
import { InlineInput } from 'ui/src/inline-input'
import { usePagesContext } from '@renderer/contexts/usePages'
import { deleteBlock, getBlocks, updateBlock } from '@renderer/libs/api/blocks'
import { Loader2, PencilIcon, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export interface NodeItemType {
  blockId: string
  text: string | undefined
  completed: boolean | undefined
}

export const TodoItem = ({ blockId, text, completed }: NodeItemType) => {
  const [isCompleted, setIsCompleted] = useState(completed)
  const queryClient = useQueryClient()
  const { currentPage } = usePagesContext()
  const [isEditing, setIsEditing] = useState(false)

  const { data } = useQuery(['blocks', currentPage], () => getBlocks(currentPage || ''), {
    enabled: !!currentPage
  })

  const { mutate: deleteMutate, isLoading } = useMutation(() => deleteBlock(blockId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['blocks', currentPage])
    }
  })

  const handleUpdateTodo = async (blockId: string, checked?: boolean, content?: string) => {
    const block = data?.results.find((block) => block.id === blockId)
    if (block) {
      setIsCompleted(checked)
      await updateBlock(blockId, {
        to_do: {
          checked: checked !== undefined ? checked : block.to_do?.checked,
          rich_text: [
            {
              text: {
                content: content || block.to_do?.rich_text[0]?.plain_text,
                link: ''
              }
            }
          ]
        }
      } as never)
      setIsEditing(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleDelete = () => {
    deleteMutate()
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger
        className={cn('flex w-full items-center group', {
          'opacity-50 line-through': isLoading
        })}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center mr-1.5">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        ) : (
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
        )}
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
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className="flex items-center" onClick={handleEdit}>
          <PencilIcon className="w-3 h-3 mr-1.5" />
          Edit
        </ContextMenuItem>
        <ContextMenuItem
          className="flex items-center text-red-400 hover:!text-red-400"
          onClick={handleDelete}
        >
          <TrashIcon className="w-3 h-3 mr-1.5" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
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
