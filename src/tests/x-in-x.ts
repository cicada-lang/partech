import { expect, test } from "vitest"

const grammars = {
  $start: "s",

  s: {
    $grammar: {
      "s:x": ['"x"'],
      "s:x_in_x": ['"x"', "s", '"x"'],
    },
  },
}

test("x in x", () => {
  expect
})
