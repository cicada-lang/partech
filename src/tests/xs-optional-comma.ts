import { expect, test } from "vitest"
import * as pt from ".."

const grammars = {
  optional: pt.grammars.optional,

  $start: "xs",

  xs: {
    $grammar: {
      "xs:zero": [{ $ap: ["optional", '","'] }],
      "xs:more": ['"x"', { $ap: ["optional", '","'] }, "xs"],
    },
  },
}

test("zero or more 'x's -- grammar with epsilon and optional", () => {
  expect
})
