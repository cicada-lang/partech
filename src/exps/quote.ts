import { Exp, AlphaReprOpts } from "../exp"
import { Ctx } from "../ctx"
import { Env } from "../env"
import { Inferable } from "../inferable"
import * as Value from "../value"

export type Quote = Exp & {
  kind: "Quote"
  str: string
}

export function Quote(str: string): Quote {
  return {
    kind: "Quote",
    str,
    evaluability: (_) => Value.quote(str),
    ...Inferable({
      inferability: ({ ctx }) => Value.str,
    }),
    repr: () => `"${str}"`,
    alpha_repr: () => `"${str}"`,
  }
}
