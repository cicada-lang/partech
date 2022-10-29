import { expect, test } from "vitest"
import * as pt from ".."

const grammars = {
  $start: "tdh",

  tdh: {
    $grammar: {
      "tdh:t": ['"t"'],
      "tdh:d": ['"d"'],
      "tdh:h": ['"h"'],
      "tdh:list": ["tdh_list"],
    },
  },

  tdh_list: {
    $grammar: {
      "tdh_list:t": ['"t"', "tdh_list_tail"],
      "tdh_list:d": ['"d"', "tdh_list_tail"],
      "tdh_list:h": ['"h"', "tdh_list_tail"],
    },
  },

  tdh_list_tail: {
    $grammar: {
      "tdh_list_tail:list": ['","', "tdh_list"],
      "tdh_list_tail:t": ['"&"', '"t"'],
      "tdh_list_tail:d": ['"&"', '"d"'],
      "tdh_list_tail:h": ['"&"', '"h"'],
    },
  },
}

const parse = pt.gen_parse({
  preprocess: pt.preprocess.erase_comment,
  lexer: pt.lexers.common,
  grammar: pt.grammar_start(grammars, "tdh"),
  matcher: (tree) => tree,
})

test("tdh -- regular grammar", () => {
  expect
})
