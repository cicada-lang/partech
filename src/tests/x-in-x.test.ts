import { expect, test } from "vitest"
import * as pt from ".."

const grammars = {
  s: {
    $grammar: {
      "s:x": ['"x"'],
      "s:x_in_x": ['"x"', "s", '"x"'],
    },
  },
}

const parse = pt.gen_parse({
  preprocess: pt.preprocess.erase_comment,
  lexer: pt.lexers.common,
  grammar: pt.grammar_start(grammars, "s"),
  matcher: (tree) => tree,
})

test("x in x", () => {
  expect
})
