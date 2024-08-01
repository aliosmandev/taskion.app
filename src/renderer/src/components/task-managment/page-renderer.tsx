import { usePagesContext } from '@renderer/contexts/usePages'
import { getBlocks } from '@renderer/libs/api/blocks'
import { BlockType } from '@renderer/libs/types/api/blocks'
import { useQuery } from 'react-query'
import { Fragment } from 'react/jsx-runtime'
import { NewTodo } from './tasks/new-todo'
import { TodoItem, TodoLoader } from './tasks/todo-item'

export const PageRenderer = () => {
  const { currentPage } = usePagesContext()

  const { data, isLoading } = useQuery(
    ['blocks', currentPage],
    () => getBlocks(currentPage || ''),
    { enabled: !!currentPage }
  )

  const computedTasks = data?.results
    .filter((block) => block.type === BlockType.TO_DO)
    .map((block) => {
      const { to_do } = block
      return {
        blockId: block.id,
        text: to_do?.rich_text.map((text) => text.plain_text).join(' '),
        completed: to_do?.checked
      }
    })

  if (!currentPage)
    return (
      <div className="flex flex-col gap-y-2 p-3 justify-center">
        <p className="text-xl font-bold">No page selected</p>
        <p className="text-sm">Select a page to view its content</p>
      </div>
    )

  return (
    <div className="flex flex-col gap-y-0.5 px-3 py-1 overflow-y-auto bg-background">
      {isLoading ? (
        new Array(10).fill(0).map((_, index) => <TodoLoader key={index} />)
      ) : (
        <Fragment>
          {computedTasks?.length && computedTasks?.length > 0 ? (
            computedTasks?.map((task) => <TodoItem key={task.blockId} {...task} />)
          ) : (
            <NotFound />
          )}
          <NewTodo />
        </Fragment>
      )}
    </div>
  )
}

const NotFound = () => {
  return (
    <div className="flex flex-col">
      <p className="text-md">No tasks</p>
      <span className="text-sm text-default-500">Add a new task to get started</span>
    </div>
  )
}
