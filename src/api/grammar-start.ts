import * as Mod from "../mod"
import { inspect } from "../utils/inspect"
import * as Value from "../value"

export function grammar_start(
  grammars: Mod.Present,
  start: string,
): Value.grammar {
  const mod = Mod.from_present(grammars)
  const grammar = Mod.dot(mod, start)

  if (grammar.kind !== "Value.grammar") {
    throw new Error(
      `Expecting grammar to be Value.grammar.\n` +
        `  start: ${start}\n` +
        `  grammar: ${inspect(Value.present(grammar))}\n`,
    )
  }

  return grammar
}
