import { expect, test } from "vitest"
import { createParser } from "./utils"

const grammars = {
  tdh: {
    $grammar: {
      "tdh:t": ['"t"'],
      "tdh:d": ['"d"'],
      "tdh:h": ['"h"'],
      "tdh:list": ["tdh_list"],
    },
  },

  tdh_list: {
    $grammar: {
      "tdh_list:t": ['"t"', "tdh_list_tail"],
      "tdh_list:d": ['"d"', "tdh_list_tail"],
      "tdh_list:h": ['"h"', "tdh_list_tail"],
    },
  },

  tdh_list_tail: {
    $grammar: {
      "tdh_list_tail:list": ['","', "tdh_list"],
      "tdh_list_tail:t": ['"&"', '"t"'],
      "tdh_list_tail:d": ['"&"', '"d"'],
      "tdh_list_tail:h": ['"&"', '"h"'],
    },
  },
}

const parse = createParser(grammars, "tdh")

test("tdh -- regular grammar", () => {
  expect(parse("t,d&h"))
  expect(() => parse("t,d,h")).toThrow()
})
