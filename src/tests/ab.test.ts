import { expect, test } from "vitest"
import { createParser } from "./utils"

const grammars = {
  ab: {
    $grammar: {
      "ab:head_a": ['"a"', "b"],
      "ab:head_b": ['"b"', "a"],
    },
  },

  a: {
    $grammar: {
      "a:one_a": ['"a"'],
      "a:more_a": ['"a"', "ab"],
      "a:after_b": ['"b"', "a", "a"],
    },
  },

  b: {
    $grammar: {
      "b:one_b": ['"b"'],
      "b:more_b": ['"b"', "ab"],
      "b:after_a": ['"a"', "b", "b"],
    },
  },
}

const parse = createParser(grammars, "ab")

test("equal number of 'a's and 'b's", () => {
  expect(parse("a a b b"))
  expect(parse("a b a b"))
  expect(parse("a b b a"))
  expect(parse("a b"))
  expect(() => parse("a a b")).toThrow()
})
