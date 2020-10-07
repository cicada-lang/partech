import * as Exp from "../exp"
import * as Stmt from "../stmt"
import * as Value from "../value"
import * as Closure from "../closure"
import * as Telescope from "../telescope"
import * as Env from "../env"
import * as Trace from "../../trace"

export function evaluate(env: Env.Env, exp: Exp.Exp): Value.Value {
  try {
    switch (exp.kind) {
      case "Exp.v": {
        const result = Env.lookup(env, exp.name)
        if (result === undefined) {
          throw new Trace.Trace(Exp.explain_name_undefined(exp.name))
        }
        return result
      }
      case "Exp.pi": {
        return Value.pi(
          Exp.evaluate(env, exp.arg_t),
          new Closure.Closure(env, exp.name, exp.ret_t)
        )
      }
      case "Exp.fn": {
        return Value.fn(new Closure.Closure(env, exp.name, exp.ret))
      }
      case "Exp.ap": {
        return Exp.do_ap(evaluate(env, exp.target), evaluate(env, exp.arg))
      }
      case "Exp.obj": {
        const { properties } = exp
        if (properties.size === 0) {
          const queue = new Array()
          const next = undefined
          const tel = Telescope.create(env, new Array(), next, queue)
          return Value.obj(tel)
        } else {
          const queue = new Array()
          for (const [name, exp] of properties) {
            queue.push({ name, exp })
          }
          const { name, exp } = queue.pop()
          const t = Exp.evaluate(env, exp)
          const next = { name, t }
          const tel = Telescope.create(env, new Array(), next, queue)
          return Value.obj(tel)
        }
      }
      case "Exp.fill": {
        throw new Error()
      }
      case "Exp.dot": {
        return Exp.do_dot(Exp.evaluate(env, exp.target), exp.name)
      }
      case "Exp.equal": {
        return Value.equal(
          Exp.evaluate(env, exp.t),
          Exp.evaluate(env, exp.from),
          Exp.evaluate(env, exp.to)
        )
      }
      case "Exp.same": {
        return Value.same
      }
      case "Exp.replace": {
        return Exp.do_replace(
          Exp.evaluate(env, exp.target),
          Exp.evaluate(env, exp.motive),
          Exp.evaluate(env, exp.base)
        )
      }
      case "Exp.absurd": {
        return Value.absurd
      }
      case "Exp.absurd_ind": {
        return Exp.do_absurd_ind(
          Exp.evaluate(env, exp.target),
          Exp.evaluate(env, exp.motive)
        )
      }
      case "Exp.str": {
        return Value.str
      }
      case "Exp.quote": {
        return Value.quote(exp.str)
      }
      case "Exp.type": {
        return Value.type
      }
      case "Exp.suite": {
        env = Env.clone(env)
        for (const stmt of exp.stmts) {
          Stmt.execute(env, stmt)
        }
        return evaluate(env, exp.ret)
      }
      case "Exp.the": {
        return Exp.evaluate(env, exp.exp)
      }
    }
  } catch (error) {
    Trace.maybe_push(error, exp)
  }
}