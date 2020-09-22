import * as Env from "../env"
import * as Mod from "../mod"
import * as Exp from "../exp"
import * as Value from "../value"
import * as DelaiedChoices from "../value/delaied-choices"
import { Obj } from "../../ut"

export type Present = Obj<any> | Array<any> | string

export function present(
  value: Value.Value
  // TODO support `opts: concise`
  // opts: { concise: boolean } = { concise: true }
): Present {
  switch (value.kind) {
    case "Value.fn": {
      const {
        ret_cl: { name, exp },
      } = value
      return { $fn: [name, Exp.present(exp)] }
    }
    case "Value.str": {
      return value.value
    }
    case "Value.pattern": {
      return { $pattern: `${value.label}#${value.value.source}` }
    }
    case "Value.grammar": {
      const { name, delaied_choices } = value
      const { choices } = delaied_choices
      return Array.from(choices, ([choice_name, parts]) =>
        Exp.choice_present(name, choice_name, parts)
      ).reduce((result, choice) => Object.assign(result, choice), {})
    }
  }
}