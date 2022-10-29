import * as Token from "../token"
import { inspect } from "../ut/inspect"
import * as Value from "../value"

export function terminal_match(
  value: Value.Value,
  token: Token.Token,
): boolean {
  switch (value.kind) {
    case "Value.str": {
      return value.value === token.value
    }
    case "Value.pattern": {
      return (
        value.label === token.label && Boolean(value.value.exec(token.value))
      )
    }
    default: {
      throw new Error(
        "Expecting value to be terminal.\n" +
          `value: ${inspect(Value.present(value))}\n`,
      )
    }
  }
}
