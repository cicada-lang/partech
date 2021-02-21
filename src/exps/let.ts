import { Exp, AlphaReprOpts } from "../exp"
import { Value } from "../value"
import { Env } from "../env"
import * as Ctx from "../ctx"
import { Inferable } from "../inferable"
import { evaluate } from "../evaluate"
import { infer } from "../infer"
import { check } from "../check"
import * as ut from "../ut"

export type Let = Exp & {
  kind: "Let"
  name: string
  exp: Exp
  ret: Exp
}

export function Let(name: string, exp: Exp, ret: Exp): Let {
  return {
    kind: "Let",
    name,
    exp,
    ret,
    evaluability({ env }: { env: Env }): Value {
      return evaluate(env.extend(name, evaluate(env, exp)), ret)
    },

    inferability({ ctx }: { ctx: Ctx.Ctx }): Value {
      return infer(
        ctx.extend(name, infer(ctx, exp), evaluate(ctx.to_env(), exp)),
        ret
      )
    },

    checkability(t: Value, { ctx }: { ctx: Ctx.Ctx }): void {
      check(
        ctx.extend(name, infer(ctx, exp), evaluate(ctx.to_env(), exp)),
        ret,
        t
      )
    },

    repr(): string {
      return `@let ${name} = ${exp.repr()} ${ret.repr()}`
    },

    alpha_repr(opts: AlphaReprOpts): string {
      return `@let ${name} = ${exp.alpha_repr(opts)} ${ret.alpha_repr({
        depth: opts.depth + 1,
        depths: new Map([...opts.depths, [name, opts.depth]]),
      })}`
    },
  }
}