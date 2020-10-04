import * as Exp from "../exp"
import * as Trace from "../../trace"
import fs from "fs"

export function run(file: string): void {
  const text = fs.readFileSync(file, { encoding: "utf-8" })
  const exp = Exp.parse(text)
  try {
    console.log(Exp.repr(Exp.normalize(exp)))
  } catch (error) {
    if (error instanceof Trace.Trace) {
      const trace = error
      console.error(Trace.repr(trace, Exp.repr))
      process.exit(1)
    } else {
      throw error
    }
  }
}
