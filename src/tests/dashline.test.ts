import { expect, test } from "vitest"
import { createParser } from "./utils"
import * as pt from ".."

const grammars = {
  one_or_more: pt.grammars.one_or_more,

  dashline: {
    $grammar: {
      "dashline:dashline": ['"-"', { $ap: ["one_or_more", '"-"'] }],
    },
  },
}

const parse = createParser(grammars, "dashline")

test("line of more then one dashes", () => {
  expect(
    parse(`
---
---
---
`),
  )

  expect(parse("---"))
  expect(parse("--"))

  expect(() => parse("-")).toThrow()
})
