import { Evaluable, EvaluationMode } from "../../evaluable"
import { Checkable } from "../../checkable"
import { Exp } from "../../exp"
import { Repr } from "../../repr"
import * as Evaluate from "../../evaluate"
import * as Readback from "../../readback"
import * as Explain from "../../explain"
import * as Value from "../../value"
import * as Pattern from "../../pattern"
import * as Neutral from "../../neutral"
import * as Mod from "../../mod"
import * as Env from "../../env"
import * as Trace from "../../../trace"
import * as ut from "../../../ut"
import { quote_evaluable } from "./quote-evaluable"
import { quote_checkable } from "./quote-checkable"

export type Quote = Evaluable &
  Checkable &
  Repr & {
    kind: "Exp.quote"
    str: string
  }

export function Quote(str: string): Quote {
  return {
    kind: "Exp.quote",
    str,
    ...quote_evaluable(str),
    ...quote_checkable(str),
    repr: () => `"${str}"`,
  }
}
