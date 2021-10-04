import * as Span from "../span"

export function span_closure(spans: Array<Span.Span>): Span.Span {
  if (spans.length === 0) {
    throw new Error(
      "I can not calculate the closure of empty array of spans, at least one span is needed."
    )
  }

  const lo = Math.min(...spans.map((span) => span.lo))
  const hi = Math.max(...spans.map((span) => span.hi))
  return { lo, hi }
}
