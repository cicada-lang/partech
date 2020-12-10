import { Evaluable, EvaluationMode } from "../../evaluable"
import { Repr } from "../../repr"
import { Exp } from "../../exp"
import * as Evaluate from "../../evaluate"
import * as Explain from "../../explain"
import * as Value from "../../value"
import * as Pattern from "../../pattern"
import * as Neutral from "../../neutral"
import * as Mod from "../../mod"
import * as Env from "../../env"
import * as Trace from "../../../trace"
import { absurd_evaluable } from "./absurd-evaluable"

export type Absurd = Evaluable &
  Repr & {
    kind: "Exp.absurd"
  }

export const Absurd: Absurd = {
  kind: "Exp.absurd",
  ...absurd_evaluable,
  repr: () => "Absurd",
}
