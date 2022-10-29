import { expect, test } from "vitest"
import { createParser } from "./utils"

const grammars = {
  s: {
    $grammar: {
      "s:x": ['"x"'],
      "s:x_in_x": ['"x"', "s", '"x"'],
    },
  },
}

const parse = createParser(grammars, "s")

test("x in x", () => {
  expect(parse("x"))
  expect(() => parse("x x")).toThrow()
  expect(parse("x x x"))
  expect(() => parse("x x x x")).toThrow()
  expect(parse("x x x x x"))
})
