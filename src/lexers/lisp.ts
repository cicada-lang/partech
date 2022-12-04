import * as TableLexer from "../table-lexer"
import * as Token from "../token"

// NOTE Remind that all regular exps use `^` which means beginning.
const table_lexer = TableLexer.build([
  ["identifier", "^\\s*([-_\\p{Letter}][-_\\p{Letter}0-9]*)\\s*", "u"],
  [
    "identifier_starts_with_uppercase",
    "^\\s*([A-Z][_\\p{Letter}0-9]*)\\s*",
    "u",
  ],
  [
    "identifier_starts_with_lowercase",
    "^\\s*([_a-z][_\\p{Letter}0-9]*)\\s*",
    "u",
  ],
  ["string", '^\\s*("(\\\\.|[^"])*")\\s*'],
  ["number", "^\\s*(\\d+\\.\\d+|\\d+|-\\d+\\.\\d+|-\\d+)\\s*"],
  ["symbol", "^\\s*([^-_\\p{Letter}0-9\\s])\\s*", "u"],
])

function lex(text: string): Array<Token.Token> {
  return text.trim().length === 0 ? [] : table_lexer.lex(text)
}

export const lisp = {
  lex,
}
