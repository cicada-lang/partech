import { expect, test } from "vitest"
import * as pt from ".."

const grammars = {
  one_or_more: pt.grammars.one_or_more,

  dashline: {
    $grammar: {
      "dashline:dashline": ['"-"', { $ap: ["one_or_more", '"-"'] }],
    },
  },
}

const parse = pt.gen_parse({
  preprocess: pt.preprocess.erase_comment,
  lexer: pt.lexers.common,
  grammar: pt.grammar_start(grammars, "dashline"),
  matcher: (tree) => tree,
})

test("line of more then one dashes", () => {
  expect(
    parse(`
---
---
---
`),
  ).toMatchInlineSnapshot(`
    {
      "body": {},
      "head": {
        "kind": "dashline",
        "name": "dashline",
      },
      "kind": "Tree.node",
      "span": {
        "hi": 12,
        "lo": 1,
      },
    }
`)

  expect(parse("---")).toMatchInlineSnapshot(`
    {
      "body": {},
      "head": {
        "kind": "dashline",
        "name": "dashline",
      },
      "kind": "Tree.node",
      "span": {
        "hi": 3,
        "lo": 0,
      },
    }
`)

  expect(parse("--")).toMatchInlineSnapshot(`
    {
      "body": {},
      "head": {
        "kind": "dashline",
        "name": "dashline",
      },
      "kind": "Tree.node",
      "span": {
        "hi": 2,
        "lo": 0,
      },
    }
  `)

  expect(() => parse("-")).toThrowErrorMatchingInlineSnapshot(`
    "Found END_OF_TOKENS, while expecting:
     \\"-\\":
         dashline:dashline@0 -> [1m[31m> [39m[22m\\"-\\" one_or_more
    "
  `)
})
