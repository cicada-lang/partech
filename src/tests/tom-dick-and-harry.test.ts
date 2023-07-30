import { expect, test } from "vitest"
import * as pt from ".."
import { createParser } from "./utils"

const grammars = {
  one_or_more: pt.grammars.one_or_more,

  tom_dick_and_harry: {
    $grammar: {
      "tom_dick_and_harry:name": ["name"],
      "tom_dick_and_harry:list": [
        { $ap: ["one_or_more", "name_entry"] },
        '"and"',
        "name",
      ],
    },
  },

  name: {
    $grammar: {
      "name:tom": ['"tom"'],
      "name:dick": ['"dick"'],
      "name:harry": ['"harry"'],
    },
  },

  name_entry: {
    $grammar: {
      "name_entry:name_alone": ["name"],
      "name_entry:name_comma": ["name", '","'],
    },
  },
}

const parse = createParser(grammars, "tom_dick_and_harry")

test("tom dick and harry", () => {
  expect(parse("tom, dick and harry"))
  expect(() => parse("tom, dick, harry")).toThrow()
})
