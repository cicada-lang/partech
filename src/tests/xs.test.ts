import { expect, test } from "vitest"
import * as pt from ".."

const grammars = {
  xs: {
    $grammar: {
      "xs:zero": [],
      "xs:more": ['"x"', "xs"],
    },
  },
}


const parse = pt.gen_parse({
  preprocess: pt.preprocess.erase_comment,
  lexer: pt.lexers.common,
  grammar: pt.grammar_start(grammars, "xs"),
  matcher: (tree) => tree,
})

test("zero or more 'x's -- grammar with epsilon", () => {
  expect
})
