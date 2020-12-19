import { Exp } from "../../exp"
import * as Ty from "../../ty"
import { the_evaluable } from "./the-evaluable"
import { the_inferable } from "./the-inferable"

export type The = Exp & {
  kind: "Exp.the"
  t: Ty.Ty
  exp: Exp
}

export function The(t: Ty.Ty, exp: Exp): The {
  return {
    kind: "Exp.the",
    t,
    exp,
    ...the_evaluable(t, exp),
    ...the_inferable(t, exp),
    repr: () => `{ ${Ty.repr(t)} -- ${exp.repr()} }`,
  }
}
