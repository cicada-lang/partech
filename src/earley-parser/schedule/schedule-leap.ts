import * as FinishedChart from "../finished-chart"
import * as Schedule from "../schedule"
import * as Task from "../task"

export function leap(
  schedule: Schedule.Schedule,
  upsteam_task: Task.Task
): void {
  const { value } = Task.next_part(upsteam_task)
  if (value.kind === "Value.grammar") {
    const grammar = value
    for (const task of FinishedChart.tasks(
      schedule.finished_chart,
      Task.progress_index(upsteam_task),
      grammar.name
    )) {
      if (Task.match_grammar_p(task, grammar)) {
        const forward_steps = Task.progress_index(task) - task.index
        Schedule.insert_task(
          schedule,
          Task.advance(upsteam_task, {
            index: Task.progress_index(upsteam_task) + forward_steps,
            choice_name: task.choice_name,
          })
        )
      }
    }
  }
}
