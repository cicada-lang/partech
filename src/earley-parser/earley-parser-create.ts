import * as EarleyParser from "../earley-parser"
import * as Token from "../token"
import * as Tree from "../tree"
import { inspect } from "../utils/inspect"
import * as Value from "../value"
import * as Schedule from "./schedule"

export function create(
  grammar: Value.Value,
  opts: Schedule.Opts = Schedule.DEFAULT_OPTS,
): EarleyParser.EarleyParser {
  if (grammar.kind !== "Value.grammar") {
    throw new Error(
      `Expecting grammar to be Value.grammar.\n` +
        `grammar: ${inspect(Value.present(grammar))}\n`,
    )
  }

  return {
    grammar,
    opts,

    // NOTE The phases of schedule:
    // create -> [init] -> run -> [finished]

    parse(tokens: Array<Token.Token>): Tree.Tree {
      const schedule = Schedule.create(tokens, grammar)
      Schedule.run(schedule, opts)
      return Schedule.harvest(schedule)
    },

    recognize(tokens: Array<Token.Token>): boolean {
      const schedule = Schedule.create(tokens, grammar)
      Schedule.run(schedule, opts)
      return Schedule.well_done_p(schedule)
    },
  }
}
