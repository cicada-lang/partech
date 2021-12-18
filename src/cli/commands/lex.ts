import fs from "fs"
import path from "path"
import * as lexers from "../../lexers"
import * as TableLexer from "../../table-lexer"
import * as ut from "../../ut"

export const command = "lex <input>"

export const description = "Lex text to tokens by table-lexer"

export const builder = {
  output: { type: "string", alias: "o" },
  table: { type: "string" },
}

type Argv = {
  input: string
  output: string | undefined
  table: string | undefined
}

export const handler = async (argv: Argv) => {
  const lexer = argv.table
    ? TableLexer.build(require(path.resolve(argv.table)))
    : lexers.common
  const text = await fs.promises.readFile(argv.input, "utf8")
  const tokens = lexer.lex(text)
  ut.write_object(tokens, argv.output)
}
