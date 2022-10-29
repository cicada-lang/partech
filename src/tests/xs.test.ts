import { expect, test } from "vitest"
import { createParser } from "./utils"
import * as pt from ".."

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
  expect
})
