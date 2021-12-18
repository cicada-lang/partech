import * as Exp from "../exp"
import * as Mod from "../mod"

export function lookup(mod: Mod.Mod, name: string): undefined | Exp.Exp {
  return mod.map.get(name)
}
