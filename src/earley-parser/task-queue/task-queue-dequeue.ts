import * as Task from "../task"
import * as TaskQueue from "../task-queue"

export function dequeue(queue: TaskQueue.TaskQueue): undefined | Task.Task {
  return queue.shift()
}
