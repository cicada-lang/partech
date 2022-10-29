import { expect, test } from "vitest"
import { createParser } from "./utils"
import * as pt from ".."

const grammars = {
  optional: pt.grammars.optional,

  xs: {
    $grammar: {
      "xs:zero": [{ $ap: ["optional", '","'] }],
      "xs:more": ['"x"', { $ap: ["optional", '","'] }, "xs"],
    },
  },
}

const parse = createParser(grammars, "xs")

test("zero or more 'x's -- grammar with epsilon and optional", () => {
  expect(parse(""))
})
