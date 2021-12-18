import * as Exp from "../exp"
import * as Mod from "../mod"

export function update(mod: Mod.Mod, name: string, exp: Exp.Exp): void {
  mod.map.set(name, exp)
}
