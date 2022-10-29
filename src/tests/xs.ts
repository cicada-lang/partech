

import { expect, test } from "vitest"
import * as pt from ".."

const grammars = {
  $start: "xs",

  xs: {
    $grammar: {
      "xs:zero": [],
      "xs:more": ['"x"', "xs"],
    },
  },
}


test("zero or more 'x's -- grammar with epsilon", () => {
  expect
})
