import * as TableLexer from "../table-lexer"
import * as Token from "../token"

const table_lexer = TableLexer.build([
  ["identifier", "^\\s*([_\\p{Letter}][_\\p{Letter}0-9]*)\\s*", "u"],
  ["string", '^\\s*("(\\\\.|[^"])*")\\s*'],
  ["number", "^\\s*(\\d+\\.\\d+|\\d+|-\\d+\\.\\d+|-\\d+)\\s*"],
  ["symbol", "^\\s*([^_\\p{Letter}0-9\\s])\\s*", "u"],
])

type Result =
  | { kind: "balance" }
  | { kind: "lack"; token: Token.Token }
  | { kind: "excess"; token: Token.Token }
  | { kind: "mismatch"; token: Token.Token }

function check_parentheses(tokens: Array<Token.Token>): Result {
  const stack: Array<Token.Token> = []
  for (const token of tokens) {
    if (
      token.label === "symbol" &&
      ["(", ")", "[", "]", "{", "}"].contains(token.value)
    ) {
      if (["(", "[", "{"].contains(token.value)) {
        stack.push(token)
      } else {
        const top = stack.pop()
        if (top === undefined) {
          return { kind: "excess", token }
        } else if (token.value !== top.value) {
          return { kind: "mismatch", token }
        }
      }
    }
  }

  if (stack.length === 0) {
    return { kind: "balance" }
  } else {
    return { kind: "lack", token: stack.pop() }
  }
}

export const common = {
  lex(text: string): Array<Token.Token> {
    return text.trim().length === 0 ? [] : table_lexer.lex(text)
  },

  check_parentheses,
}
