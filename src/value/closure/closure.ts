import * as Env from "../../env"
import * as Exp from "../../exp"
import * as Mod from "../../mod"

export type Closure = {
  name: string
  exp: Exp.Exp
  mod: Mod.Mod
  env: Env.Env
}
