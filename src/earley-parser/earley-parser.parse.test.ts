import { expect, test } from "vitest"
import * as Tree from "../tree"
import { lexer, parser } from "./earley-parser.parse"

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
