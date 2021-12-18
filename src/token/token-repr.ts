import * as Token from "../token"

export function repr(token: Token.Token): string {
  const { label, value, span } = token
  return JSON.stringify([label, value, [span.lo, span.hi]])
}
