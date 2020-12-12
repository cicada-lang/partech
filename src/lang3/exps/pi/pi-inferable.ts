import { Inferable } from "../../inferable"
import { evaluator } from "../../evaluator"
import { Exp } from "../../exp"
import * as Value from "../../value"
import * as Check from "../../check"
import * as Ctx from "../../ctx"

export const pi_inferable = (name: string, arg_t: Exp, ret_t: Exp) =>
  Inferable({
    inferability: ({ mod, ctx }) => {
      Check.check(mod, ctx, arg_t, Value.type)
      Check.check(
        mod,
        Ctx.extend(
          ctx,
          name,
          evaluator.evaluate(arg_t, { mod, env: Ctx.to_env(ctx) })
        ),
        ret_t,
        Value.type
      )
      return Value.type
    },
  })