import { expect, test } from "vitest"
import { createParser } from "./utils"
import * as pt from ".."

const grammars = {
  one_or_more: pt.grammars.one_or_more,

  identifier: { $pattern: ["identifier"] },

  sexp: {
    $grammar: {
      "sexp:symbol": ["identifier"],
      "sexp:null": ['"("', '")"'],
      "sexp:list": ['"("', { $ap: ["one_or_more", "sexp"] }, '")"'],
    },
  },
}

const parse = createParser(grammars, "sexp")

test("Symbol expression (a.k.a. sexp) -- implemented by one_or_more", () => {
  expect
})
