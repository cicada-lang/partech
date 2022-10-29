import { expect, test } from "vitest"
import * as pt from ".."

test("parens_check", () => {
  expect(pt.lexers.lisp.lex("define-node ->").length).toBe(3)
  expect(pt.lexers.lisp.lex("define-node").length).toBe(1)
})
