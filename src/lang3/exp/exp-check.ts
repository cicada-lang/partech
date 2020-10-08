import * as Exp from "../exp"
import * as Stmt from "../stmt"
import * as Value from "../value"
import * as Neutral from "../neutral"
import * as Closure from "../closure"
import * as Telescope from "../telescope"
import * as Ctx from "../ctx"
import * as Trace from "../../trace"
import * as ut from "../../ut"

export function check(ctx: Ctx.Ctx, exp: Exp.Exp, t: Value.Value): void {
  try {
    if (exp.kind === "Exp.fn") {
      const pi = Value.is_pi(ctx, t)
      const arg = Value.not_yet(pi.arg_t, Neutral.v(exp.name))
      const ret_t = Closure.apply(pi.ret_t_cl, arg)
      Exp.check(Ctx.extend(ctx, exp.name, pi.arg_t), exp.ret, ret_t)
    } else if (exp.kind === "Exp.obj") {
      const cls = Value.is_cls(ctx, t)
      const { env, sat, next, scope } = cls.tel
      for (const entry of sat) {
        const found = exp.properties.get(entry.name)
        if (found === undefined) {
          throw new Trace.Trace(
            ut.aline(`
              |Can no found satisfied entry name: ${entry.name}
              |`)
          )
        }
        Exp.check(ctx, found, entry.t)
        const value = Exp.evaluate(Ctx.to_env(ctx), found)
        Value.conversion(ctx, entry.t, value, entry.value)
      }
      if (next === undefined) {
        return
      }
      const found = exp.properties.get(next.name)
      if (found === undefined) {
        throw new Trace.Trace(
          ut.aline(`
            |Can no found next name: ${next.name}
            |`)
        )
      }
      Exp.check(ctx, found, next.t)
      const less_properties = new Map(exp.properties)
      less_properties.delete(next.name)
      const value = Exp.evaluate(Ctx.to_env(ctx), found)
      const filled_tel = Telescope.fill(cls.tel, value)
      Exp.check(ctx, Exp.obj(less_properties), Value.cls(filled_tel))
    } else if (exp.kind === "Exp.same") {
      const equal = Value.is_equal(ctx, t)
      if (!Value.conversion(ctx, equal.t, equal.from, equal.to)) {
        throw new Trace.Trace(
          ut.aline(`
          |I am expecting the following two values to be the same ${Exp.repr(
            Value.readback(ctx, Value.type, equal.t)
          )}.
          |But they are not.
          |from:
          |  ${Exp.repr(Value.readback(ctx, equal.t, equal.from))}
          |to:
          |  ${Exp.repr(Value.readback(ctx, equal.t, equal.to))}
          |`)
        )
      }
    } else if (exp.kind === "Exp.suite") {
      const { stmts, ret } = exp
      ctx = Ctx.clone(ctx)
      for (const stmt of stmts) {
        Stmt.declare(ctx, stmt)
      }
      Exp.check(ctx, ret, t)
    } else {
      const u = Exp.infer(ctx, exp)
      if (!Value.conversion(ctx, Value.type, t, u)) {
        throw new Trace.Trace(
          ut.aline(`
          |I infer the type of ${Exp.repr(exp)} to be ${Exp.repr(
            Value.readback(ctx, Value.type, u)
          )}.
          |But the given type is ${Exp.repr(
            Value.readback(ctx, Value.type, t)
          )}.
          |`)
        )
      }
    }
  } catch (error) {
    Trace.maybe_push(error, exp)
  }
}