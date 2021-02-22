import * as Schedule from "../schedule"
import * as TaskChart from "../task-chart"
import * as FinishedChart from "../finished-chart"
import { ParsingError } from "../../errors"
import * as Value from "../../value"
import * as Task from "../task"
import * as ut from "../../ut"

export function step(schedule: Schedule.Schedule, task: Task.Task): void {
  const { value } = Task.next_part(task)
  switch (value.kind) {
    case "Value.fn": {
      const index = Task.progress_index(task)
      const token = schedule.tokens[index]
      const span = token.span
      throw new ParsingError(
        "Schedule.step should not meet Value.fn\n" +
          `value: ${ut.inspect(Value.present(value))}`,
        { span }
      )
    }
    case "Value.str":
    case "Value.pattern": {
      match_terminal(schedule, task, value)
      return
    }
    case "Value.grammar": {
      Schedule.insert_grammar(schedule, value, Task.progress_index(task))
      return
    }
  }
}

function match_terminal(
  schedule: Schedule.Schedule,
  task: Task.Task,
  value: Value.Value
): void {
  if (
    Task.progress_index(task) < schedule.tokens.length &&
    Value.terminal_match(value, schedule.tokens[Task.progress_index(task)])
  ) {
    Schedule.insert_task(
      schedule,
      Task.advance(task, { index: Task.progress_index(task) + 1 })
    )
  }
}
