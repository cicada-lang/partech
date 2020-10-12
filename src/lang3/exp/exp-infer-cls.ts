import * as Exp from "../exp"
import * as Value from "../value"
import * as Ctx from "../ctx"

export function infer_cls(ctx: Ctx.Ctx, cls: Exp.cls): Value.type {
  // NOTE We DO need to update the `ctx` as we go along.
  // - just like inferring `Exp.sigma`.
  ctx = Ctx.clone(ctx)
  go_through_sat(ctx, cls.sat)
  return infer_scope(ctx, cls.scope)
}

function go_through_sat(
  ctx: Ctx.Ctx,
  sat: Array<{ name: string; t: Exp.Exp; exp: Exp.Exp }>
): void {
  for (const entry of sat) {
    Exp.check(ctx, entry.t, Value.type)
    const t = Exp.evaluate(Ctx.to_env(ctx), entry.t)
    Exp.check(ctx, entry.exp, t)
    Ctx.update(ctx, entry.name, t)
  }
}

function infer_scope(
  ctx: Ctx.Ctx,
  scope: Array<{ name: string; t: Exp.Exp }>
): Value.type {
  if (scope.length === 0) return Value.type

  const [entry, ...tail] = scope
  Exp.check(ctx, entry.t, Value.type)
  const t = Exp.evaluate(Ctx.to_env(ctx), entry.t)
  Ctx.update(ctx, entry.name, t)
  return infer_scope(ctx, tail)
}