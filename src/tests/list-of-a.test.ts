import { expect, test } from "vitest"

const grammars = {
  $start: "list_of_a",

  list_of_a: {
    $grammar: {
      "list_of_a:list": ['"["', "aaa", '"]"'],
    },
  },

  aaa: {
    $grammar: {
      "aaa:zero": [],
      "aaa:more": ['"a"', "aaa"],
    },
  },
}

test("list of a -- grammar with epsilon", () => {
  expect
})
