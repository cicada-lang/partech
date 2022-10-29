import { expect, test } from "vitest"
import * as pt from ".."

const grammars = {
  zero_or_more: pt.grammars.zero_or_more,

  identifier: { $pattern: ["identifier"] },

  sexp: {
    $grammar: {
      "sexp:symbol": ["identifier"],
      "sexp:list": ['"("', { $ap: ["zero_or_more", "sexp"] }, '")"'],
    },
  },
}

const parse = pt.gen_parse({
  preprocess: pt.preprocess.erase_comment,
  lexer: pt.lexers.common,
  grammar: pt.grammar_start(grammars, "sexp"),
  matcher: (tree) => tree,
})

test("Symbol expression (a.k.a. sexp) -- implemented by zero_or_more", () => {
  expect
})
