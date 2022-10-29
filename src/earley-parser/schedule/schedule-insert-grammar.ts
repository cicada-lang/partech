import { ParsingError } from "../../errors"
import { inspect } from "../../utils/inspect"
import * as Value from "../../value"
import * as Schedule from "../schedule"
import * as Task from "../task"

export function insert_grammar(
  schedule: Schedule.Schedule,
  grammar: Value.Value,
  index: number,
): void {
  if (grammar.kind === "Value.grammar") {
    const choices = Value.DelayedChoices.force(grammar.delayed)
    for (const [choice_name, parts] of choices) {
      Schedule.insert_task(
        schedule,
        Task.start(grammar.name, choice_name, parts, index),
      )
    }
  } else {
    const token = schedule.tokens[index]
    const span = token.span
    throw new ParsingError(
      "expecting grammar to be Value.grammar.\n" +
        `grammar: ${inspect(Value.present(grammar))}\n`,
      { span },
    )
  }
}
