import * as Token from "../../token"
import * as Value from "../../value"
import * as FinishedChart from "../finished-chart"
import * as ResumableChart from "../resumable-chart"
import * as TaskChart from "../task-chart"
import * as TaskQueue from "../task-queue"

export type Schedule = {
  tokens: Array<Token.Token>
  grammar: Value.grammar
  queue: TaskQueue.TaskQueue
  chart: TaskChart.TaskChart
  resumable_chart: ResumableChart.ResumableChart
  finished_chart: FinishedChart.FinishedChart
}
