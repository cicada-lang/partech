import * as Task from "../task"
import * as TaskQueue from "../task-queue"

export function enqueue(queue: TaskQueue.TaskQueue, task: Task.Task): void {
  queue.push(task)
}
