import { inspect } from "../../ut/inspect"
import * as Task from "../task"
import * as TaskChart from "../task-chart"

export function tasks_at(
  chart: TaskChart.TaskChart,
  index: number
): IterableIterator<Task.Task> {
  const task_map = chart[index]

  if (task_map === undefined) {
    throw new Error(
      "task_map is empty\n" + `index: ${index}\n` + `chart: ${inspect(chart)}\n`
    )
  }

  return task_map.values()
}
