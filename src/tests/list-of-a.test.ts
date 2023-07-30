import { expect, test } from "vitest"
import { createParser } from "./utils"

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

const parse = createParser(grammars, "list_of_a")

test("list of a -- grammar with epsilon", () => {
  expect(parse("[a a a a]"))
  expect(() => parse("a a a a")).toThrow()
  expect(() => parse("[a b a a]")).toThrow()
})
