import * as Machine from "../machine"
import * as Schedule from "../schedule"
import * as Token from "../../../token"
import * as Value from "../../../value"

export function run(machine: Machine.Machine): void {
  while (true) {
    const task = machine.schedule.queue.shift()
    if (task === undefined) return
    else if (task.finished_p) Machine.resume(machine, task)
    else Machine.step(machine, task)
  }
}
