import { expect, test } from "vitest"
import * as pt from ".."

// equal number of "a" "b"

export const grammars = {
  ab: {
    $grammar: {
      "ab:head_a": ['"a"', "b"],
      "ab:head_b": ['"b"', "a"],
    },
  },

  a: {
    $grammar: {
      "a:one_a": ['"a"'],
      "a:more_a": ['"a"', "ab"],
      "a:after_b": ['"b"', "a", "a"],
    },
  },

  b: {
    $grammar: {
      "b:one_b": ['"b"'],
      "b:more_b": ['"b"', "ab"],
      "b:after_a": ['"a"', "b", "b"],
    },
  },
}

const parseExp = pt.gen_parse({
  preprocess: pt.preprocess.erase_comment,
  lexer: pt.lexers.common,
  grammar: pt.grammar_start(grammars, "ab"),
  matcher: (tree) => tree,
})

test("ab -- ok", () => {
  expect(parseExp("a a b b")).toMatchInlineSnapshot(`
    {
      "body": {},
      "head": {
        "kind": "head_a",
        "name": "ab",
      },
      "kind": "Tree.node",
      "span": {
        "hi": 7,
        "lo": 0,
      },
    }
  `)
})