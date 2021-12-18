import * as TableLexer from "../table-lexer"

export type Present = Array<[string, string, string?]>

export function build(present: Present): TableLexer.TableLexer {
  return TableLexer.create(
    present.map(([label, pattern, flags]) => [
      label,
      new RegExp(pattern, flags),
    ])
  )
}
