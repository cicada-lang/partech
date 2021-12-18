import * as Token from "../token"

export function report(token: Token.Token): string {
  const {
    label,
    value,
    span: { lo, hi },
  } = token
  return `the ${label} ${JSON.stringify(value)} in [${lo}, ${hi}]`
}
