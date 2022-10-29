import { expect, test } from "vitest"
import * as pt from ".."

const grammars = {
  one_or_more: pt.grammars.one_or_more,

  $start: "dashline",

  dashline: {
    $grammar: {
      "dashline:dashline": ['"-"', { $ap: ["one_or_more", '"-"'] }],
    },
  },
}

test("line of more then one dashes", () => {
  expect
})
