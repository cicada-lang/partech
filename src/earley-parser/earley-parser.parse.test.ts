import { expect, test } from "vitest"
import * as EarleyParser from "../earley-parser"
import * as Mod from "../mod"
import * as TableLexer from "../table-lexer"
import * as Tree from "../tree"

const E = {
  $grammar: {
    "E:EQF": ["E", "Q", "F"],
    "E:F": ["F"],
  },
}

const F = {
  $grammar: {
    "F:a": ['"a"'],
  },
}

const Q = {
  $grammar: {
    "Q:+": ['"+"'],
    "Q:-": ['"-"'],
  },
}

const one_or_more = {
  $fn: [
    "x",
    {
      $grammar: {
        "one_or_more:one": [{ value: "x" }],
        "one_or_more:more": [
          { head: "x" },
          { tail: { $ap: ["one_or_more", "x"] } },
        ],
      },
    },
  ],
}

const S = {
  $grammar: {
    "S:S": [{ start: { $ap: ["one_or_more", '"("', "E", '")"'] } }],
  },
}

export const mod = Mod.from_present({ E, F, Q, one_or_more, S })
export const grammar = Mod.dot(mod, "S")
export const parser = EarleyParser.create(grammar)
export const lexer = TableLexer.create([["char", /(.)/]])

function length_of_one_or_more(tree: Tree.Tree): number {
  if (tree.kind !== "Tree.node") {
    throw new Error("expecting Tree.node")
  }

  if (tree.head.kind === "one") {
    return 1
  } else if (tree.head.kind === "more") {
    return 1 + length_of_one_or_more(tree.body.tail)
  } else {
    throw new Error("expecting one_or_more")
  }
}

function assertLength(text: string, length: number): void {
  const tree = parser.parse(lexer.lex(text))
  if (tree.kind !== "Tree.node") {
    throw new Error("expecting Tree.node")
  }

  expect(length_of_one_or_more(tree.body.start)).toBe(length)
}

test("parse", () => {
  assertLength("(a)", 1)
  assertLength("(a)(a)", 2)
  assertLength("(a)(a)(a)", 3)
  assertLength("(a-a)", 1)
  assertLength("(a-a+a)", 1)
  assertLength("(a)(a)(a)(a)(a)(a)(a)(a)", 8)
  assertLength("(a-a)(a-a)(a-a)", 3)
  assertLength("(a-a+a)(a-a+a)(a-a+a)", 3)
  assertLength("(a)(a-a)(a-a+a)", 3)
})
