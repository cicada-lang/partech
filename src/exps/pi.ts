import { Exp } from "../exp"
import * as Value from "../value"
import { Inferable } from "../inferable"
import { check } from "../check"
import { evaluate } from "../evaluate"
import * as Ctx from "../ctx"

export type Pi = Exp & {
  kind: "Pi"
  name: string
  arg_t: Exp
  ret_t: Exp
}

export function Pi(name: string, arg_t: Exp, ret_t: Exp): Pi {
  return {
    kind: "Pi",
    name,
    arg_t,
    ret_t,
    evaluability: ({ env }) =>
      Value.pi(evaluate(env, arg_t), Value.Closure.create(env, name, ret_t)),
    ...Inferable({
      inferability: ({ ctx }) => {
        check(ctx, arg_t, Value.type)
        const arg_t_value = evaluate(ctx.to_env(), arg_t)
        check(ctx.extend(name, arg_t_value), ret_t, Value.type)
        return Value.type
      },
    }),
    repr: () => `(${name}: ${arg_t.repr()}) -> ${ret_t.repr()}`,
    alpha_repr: (opts) => {
      const arg_t_repr = arg_t.alpha_repr(opts)
      const ret_t_repr = ret_t.alpha_repr({
        depth: opts.depth + 1,
        depths: new Map([...opts.depths, [name, opts.depth]]),
      })
      return `(${arg_t_repr}) -> ${ret_t_repr}`
    },
  }
}