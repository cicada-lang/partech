import * as Span from "../span"
import { color, ColorMode } from "../ut/color"
import { in_browser_p } from "../ut/in-browser-p"
import { interval_overlap_p } from "../ut/interval"

export function report(span: Span.Span, context: string): string {
  let s = repr_in_context(span, context)
  s = decorate_line_number(s)
  s = line_span_focus(to_line_span_in_context(span, context), s, 3)
  return s
}

const color_mode: ColorMode = in_browser_p() ? "html" : "escape-code"

function repr_in_context(
  span: Span.Span,
  context: string,
  opts: {
    mode: ColorMode
  } = {
    mode: color_mode,
  },
): string {
  let s = ""
  for (let i = 0; i < context.length; i++) {
    if (span.lo <= i && i < span.hi) {
      s += color(context.charAt(i), { ...opts, background: "red" })
    } else {
      s += context.charAt(i)
    }
  }
  // NOTE END_OF_FILE
  if (span.lo === context.length && span.hi === context.length) {
    s += color(" ", { ...opts, background: "red" })
  }
  return s
}

function decorate_line_number(text: string): string {
  let lines = text.split("\n")
  let max = lines.length + 1
  let width = max.toString().length
  let decorated = ""
  for (const [i, line] of lines.entries()) {
    let line_number = i + 1 // NOTE index from 1 instead of 0
    let line_number_string = line_number.toString()
    line_number_string =
      " ".repeat(width - line_number_string.length) + line_number_string
    decorated += " "
    decorated += line_number_string
    decorated += " |"
    decorated += line
    decorated += "\n"
  }
  return decorated
}

function to_line_span_in_context(span: Span.Span, context: string): Span.Span {
  let line_indexes = new Set<number>()
  let cursor = 0
  let lines = context.split("\n")
  for (let [i, line] of lines.entries()) {
    if (
      interval_overlap_p(span.lo, span.hi, cursor, cursor + line.length + 1)
    ) {
      line_indexes.add(i)
    }
    cursor += line.length + 1
  }
  const lo = Math.min(...line_indexes)
  const hi = Math.max(...line_indexes)
  return { lo, hi }
}

function line_span_focus(
  span: Span.Span,
  context: string,
  margin: number,
): string {
  let lines = context.split("\n")
  return lines.slice(Math.max(0, span.lo - margin), span.hi + margin).join("\n")
}
