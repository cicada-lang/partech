import { expect, test } from "vitest"
import * as pt from ".."
import { createParser } from "./utils"

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
