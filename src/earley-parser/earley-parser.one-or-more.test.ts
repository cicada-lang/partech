import { expect, test } from "vitest"
import * as EarleyParser from "../earley-parser"
import * as Mod from "../mod"
import * as TableLexer from "../table-lexer"

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
    "S:S": [{ $ap: ["one_or_more", '"("', "E", '")"'] }],
  },
}

export const mod = Mod.from_present({ E, F, Q, one_or_more, S })
export const grammar = Mod.dot(mod, "S")
export const parser = EarleyParser.create(grammar)
export const lexer = TableLexer.create([["char", /(.)/]])

function ok(test: string): void {
  expect(parser.recognize(lexer.lex(test))).toBe(true)
}

function oh(test: string): void {
  expect(parser.recognize(lexer.lex(test))).toBe(false)
}

test("one-or-more", () => {
  ok("(a)")
  ok("(a-a)")
  ok("(a-a+a)")
  ok("(a)(a)(a)")
  ok("(a-a)(a-a)(a-a)")
  ok("(a-a+a)(a-a+a)(a-a+a)")
  ok("(a)(a-a)(a-a+a)")

  oh("a")
  oh("a-a")
  oh("a-a+a")
  oh("(a-a+a")

  oh("(a-a+b)")
  oh("(a-a++)")
  oh("a-a+b")
  oh("a-a++")
})
