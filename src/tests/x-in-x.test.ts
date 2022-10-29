import { expect, test } from "vitest"
import { createParser } from "./utils"
import * as pt from ".."

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
  expect
})
