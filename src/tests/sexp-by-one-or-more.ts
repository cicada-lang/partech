import { expect, test } from "vitest"
import * as pt from ".."

const grammars = {
  one_or_more: pt.grammars.one_or_more,

  $start: "sexp",

  identifier: { $pattern: ["identifier"] },

  sexp: {
    $grammar: {
      "sexp:symbol": ["identifier"],
      "sexp:null": ['"("', '")"'],
      "sexp:list": ['"("', { $ap: ["one_or_more", "sexp"] }, '")"'],
    },
  },
}

test("Symbol expression (a.k.a. sexp) -- implemented by one_or_more", () => {
  expect
})
