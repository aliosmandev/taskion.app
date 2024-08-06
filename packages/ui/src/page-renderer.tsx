import { Fragment } from "react/jsx-runtime"
import { usePagesContext } from "./contexts/usePagesContext"
import { TodoItem, TodoLoader } from "./todo-item"
import { NewTodo } from "./new-todo"


export const PageRenderer = () => {
  const { currentPage, blocks } = usePagesContext()

  const computedTasks = blocks
    .filter((block) => block.pageId === currentPage)
    .map((block) => ({
      blockId: block.id,
      text: block.text,
      completed: block.completed
    }))

  if (!currentPage)
    return (
      <div className="flex flex-col gap-y-2 p-3 justify-center">
        <p className="text-xl font-bold">No page selected</p>
        <p className="text-sm">Select a page to view its content</p>
      </div>
    )

  return (
    <div className="flex flex-col gap-y-0 overflow-y-auto bg-background">
      {computedTasks.length > 0 ? (
        <Fragment>
          {computedTasks.map((task) => (
            <TodoItem key={task.blockId} {...task} />
          ))}
          <NewTodo />
        </Fragment>
      ) : (
        <Fragment>
          {new Array(10).fill(0).map((_, index) => (
            <TodoLoader key={index} />
          ))}
          <NotFound />
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