import { expect, test } from "vitest"
import { lexer, parser } from "./earley-parser.recognize"

function ok(test: string): void {
  expect(parser.recognize(lexer.lex(test))).toBe(true)
}

function oh(test: string): void {
  expect(!parser.recognize(lexer.lex(test))).toBe(true)
}

test("recognize", () => {
  ok("a")
  ok("a-a")
  ok("a-a+a")

  oh("a-a+b")
  oh("a-a++")
})
