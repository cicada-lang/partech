import * as TableLexer from "../table-lexer"
import * as Token from "../token"

// NOTE Remind that all regular exps use `^` which means beginning.
const table_lexer = TableLexer.build([
  ["identifier", "^\\s*([_\\p{Letter}][_\\p{Letter}0-9]*)\\s*", "u"],
  ["string", '^\\s*("(\\\\.|[^"])*")\\s*'],
  ["number", "^\\s*(\\d+\\.\\d+|\\d+|-\\d+\\.\\d+|-\\d+)\\s*"],
  ["symbol", "^\\s*([^_\\p{Letter}0-9\\s])\\s*", "u"],
])

function lex(text: string): Array<Token.Token> {
  return text.trim().length === 0 ? [] : table_lexer.lex(text)
}

type Result =
  | { kind: "balance" }
  | { kind: "lack"; token: Token.Token }
  | { kind: "excess"; token: Token.Token }
  | { kind: "mismatch"; token: Token.Token }

function match_parentheses(left: string, right: string): boolean {
  return (
    (left === "(" && right === ")") ||
    (left === "[" && right === "]") ||
    (left === "{" && right === "}")
  )
}

function parens_check(text: string): Result {
  const tokens = lex(text)
  const stack: Array<Token.Token> = []
  for (const token of tokens) {
    if (
      token.label === "symbol" &&
      ["(", ")", "[", "]", "{", "}"].includes(token.value)
    ) {
      if (["(", "[", "{"].includes(token.value)) {
        stack.push(token)
      } else {
        const top = stack.pop()
        if (top === undefined) {
          return { kind: "excess", token }
        } else if (!match_parentheses(top.value, token.value)) {
          return { kind: "mismatch", token }
        }
      }
    }
  }

  const top = stack.pop()
  if (top === undefined) {
    return { kind: "balance" }
  } else {
    return { kind: "lack", token: top }
  }
}

function parens_depth(text: string): number {
  let depth = 0
  const tokens = lex(text)
  const stack: Array<Token.Token> = []
  for (const token of tokens) {
    if (
      token.label === "symbol" &&
      ["(", ")", "[", "]", "{", "}"].includes(token.value)
    ) {
      if (["(", "[", "{"].includes(token.value)) {
        stack.push(token)
      } else {
        const top = stack.pop()
        if (top === undefined) {
          throw new Error("parentheses excess")
        } else if (!match_parentheses(top.value, token.value)) {
          throw new Error("parentheses mismatch")
        }
      }
    }
  }

  return stack.length
}

export const common = {
  lex,
  parens_check,
  parens_depth,
}
