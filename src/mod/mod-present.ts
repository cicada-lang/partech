import * as Exp from "../exp"
import * as Mod from "../mod"
import { Obj } from "../ut/obj"

export type Present = Obj<Exp.Present> | Mod.Metadata

export function present(mod: Mod.Mod): Present {
  const present: Present = {}

  for (const [name, exp] of mod.map) {
    present[name] = Exp.present(exp)
  }

  for (const [key, value] of Object.entries(mod.metadata)) {
    present["$" + key] = value
  }

  return present
}
