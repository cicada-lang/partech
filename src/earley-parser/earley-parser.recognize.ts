import * as EarleyParser from "../earley-parser"
import * as Mod from "../mod"
import * as TableLexer from "../table-lexer"

const E = {
  $grammar: {
    "E:EQF": ["E", "Q", "F"],
    "E:F": ["F"],
  },
}

const F = {
  $grammar: {
    "F:a": ['"a"'],
  },
}

const Q = {
  $grammar: {
    "Q:+": ['"+"'],
    "Q:-": ['"-"'],
  },
}

export const mod = Mod.from_present({ E, F, Q })
export const grammar = Mod.dot(mod, "E")
export const parser = EarleyParser.create(grammar)
export const lexer = TableLexer.create([["char", /(.)/]])
