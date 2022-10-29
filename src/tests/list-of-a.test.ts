import { expect, test } from "vitest"
import * as pt from ".."

const grammars = {
  list_of_a: {
    $grammar: {
      "list_of_a:list": ['"["', "aaa", '"]"'],
    },
  },

  aaa: {
    $grammar: {
      "aaa:zero": [],
      "aaa:more": ['"a"', "aaa"],
    },
  },
}

const parse = pt.gen_parse({
  preprocess: pt.preprocess.erase_comment,
  lexer: pt.lexers.common,
  grammar: pt.grammar_start(grammars, "list_of_a"),
  matcher: (tree) => tree,
})

test("list of a -- grammar with epsilon", () => {
  expect
})
