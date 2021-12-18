import * as Task from "../task"
import * as TaskChart from "../task-chart"

export function tasks_at_end(
  chart: TaskChart.TaskChart
): IterableIterator<Task.Task> {
  return TaskChart.tasks_at(chart, TaskChart.length(chart) - 1)
}
