import { expect, test } from "vitest"
import * as pt from ".."

const grammars = {
  one_or_more: pt.grammars.one_or_more,

  dashline: {
    $grammar: {
      "dashline:dashline": ['"-"', { $ap: ["one_or_more", '"-"'] }],
    },
  },
}

const parse = pt.gen_parse({
  preprocess: pt.preprocess.erase_comment,
  lexer: pt.lexers.common,
  grammar: pt.grammar_start(grammars, "dashline"),
  matcher: (tree) => tree,
})

test("line of more then one dashes", () => {
  expect
})
