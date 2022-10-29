import { expect, test } from "vitest"
import { createParser } from "./utils"

const grammars = {
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

const parse = createParser(grammars, "ab")

test("equal number of 'a's and 'b's", () => {
  expect(parse("a a b b")).toMatchInlineSnapshot(`
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

  expect(parse("a b a b")).toMatchInlineSnapshot(`
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

  expect(parse("a b b a")).toMatchInlineSnapshot(`
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

  expect(parse("a b")).toMatchInlineSnapshot(`
    {
      "body": {},
      "head": {
        "kind": "head_a",
        "name": "ab",
      },
      "kind": "Tree.node",
      "span": {
        "hi": 3,
        "lo": 0,
      },
    }
  `)

  expect(() => parse("a a b")).toThrowErrorMatchingInlineSnapshot(`
    "Found END_OF_TOKENS, while expecting:
     \\"b\\":
         b:one_b@1 -> [1m[31m> [39m[22m\\"b\\" 
     \\"b\\":
         b:more_b@1 -> [1m[31m> [39m[22m\\"b\\" ab 
     \\"a\\":
         b:after_a@1 -> [1m[31m> [39m[22m\\"a\\" b b 
    "
  `)
})
