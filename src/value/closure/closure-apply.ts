import * as Env from "../../env"
import * as Exp from "../../exp"
import * as Value from "../../value"
import * as Closure from "../closure"

export function apply(
  cl: Closure.Closure,
  args: Array<Value.Value>
): Array<Value.Value> {
  const { name, exp, mod, env } = cl
  return Exp.evaluate(mod, Env.extend(env, name, args), exp)
}
