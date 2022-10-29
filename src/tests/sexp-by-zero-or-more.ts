import { expect, test } from "vitest"
import * as pt from ".."

const grammars = {
  zero_or_more: pt.grammars.zero_or_more,

  $start: "sexp",

  identifier: { $pattern: ["identifier"] },

  sexp: {
    $grammar: {
      "sexp:symbol": ["identifier"],
      "sexp:list": ['"("', { $ap: ["zero_or_more", "sexp"] }, '")"'],
    },
  },
}

test("Symbol expression (a.k.a. sexp) -- implemented by zero_or_more", () => {
  expect
})
