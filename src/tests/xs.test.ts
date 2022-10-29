import { expect, test } from "vitest"
import { createParser } from "./utils"

const grammars = {
  xs: {
    $grammar: {
      "xs:zero": [],
      "xs:more": ['"x"', "xs"],
    },
  },
}

const parse = createParser(grammars, "xs")

test("zero or more 'x's -- grammar with epsilon", () => {
  expect(parse(""))
  expect(parse("x"))
  expect(parse("x x"))
  expect(parse("x x x"))
  expect(() => parse("x y x y")).toThrow()
  expect(() => parse("y")).toThrow()
})
