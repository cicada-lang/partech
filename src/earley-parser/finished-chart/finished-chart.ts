import * as Task from "../task"

export type TaskId = string
export type GrammarName = string

// NOTE to optimise `Schedule.resume`

export type FinishedChart = Array<Map<GrammarName, Map<TaskId, Task.Task>>>
