import { color, ColorMode } from "../../utils/color"
import { in_browser_p } from "../../utils/in-browser-p"
import { assert_json_array } from "../../utils/json"
import * as Value from "../../value"
import * as Task from "../task"

// NOTE The format of repr:
// <task> = <grammar>:<choice>@<index> -> <part> ...
// <part> = <grammar>:<choice>@<index> | <grammar>@<index>

const color_mode: ColorMode = in_browser_p() ? "html" : "escape-code"

const POINTER = color("> ", { mode: color_mode, color: "red" })

export function repr(task: Task.Task): string {
  let s = task.grammar_name + ":" + task.choice_name + "@" + task.index + " -> "
  for (let i = 0; i < task.parts.length; i++) {
    if (i === task.progress.length) {
      s += POINTER
    }
    s += repr_part(task.parts[i])
    if (i < task.progress.length) {
      s += repr_progress_entry(task.progress[i])
    }
    s += " "
  }
  return s
}

function repr_progress_entry(entry: {
  choice_name?: string
  index: number
}): string {
  const { choice_name, index } = entry
  if (choice_name) {
    return `:${choice_name}@${index}`
  } else {
    return `@${index}`
  }
}

function repr_part(part: { name?: string; value: Value.Value }): string {
  const { name, value } = part
  const present = Value.present(value, { on_grammar: "only_show_name" })

  let s = ""
  if (typeof present === "string") {
    s += present.toString()
  } else if (present instanceof Array) {
    s += JSON.stringify(present)
  } else if (present.hasOwnProperty("$pattern")) {
    const [pattern_name] = assert_json_array(present["$pattern"])
    s += pattern_name
  } else {
    s += JSON.stringify(present)
  }
  return name ? repr_named(name, s) : s
}

function repr_named(name: string, s: string): string {
  return `(${name}: ${s})`
}
