import { expect, test } from "vitest"
import { createParser } from "./utils"
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

const parse = createParser(grammars, "sexp")

test("Symbol expression (a.k.a. sexp) -- implemented by zero_or_more", () => {
  expect(
    parse(`
(
  ()
  ( )
  (a)
  (a b c)
  n
  (a b (c))
  (((a)) b (c))
  (true false)
  (true false true)
  (true ((((false)))))
  ( true false)
  (true false true )
  (true ((( (false)))))
)`),
  )

  expect(() => parse("(a b c))")).toThrow()
  expect(() => parse("(a b c")).toThrow()
  expect(() => parse("(a ? c)")).toThrow()
})
