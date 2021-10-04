import * as Span from "../span"

export function span_union(spans: Array<Span.Span>): Span.Span {
  const lo = Math.min(...spans.map((span) => span.lo))
  const hi = Math.max(...spans.map((span) => span.hi))
  return { lo, hi }
}
