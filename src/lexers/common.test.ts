import { expect, test } from "vitest"
import * as pt from ".."

test("parens_check", () => {
  expect(pt.lexers.common.parens_check("(())").kind).toBe("balance")
  expect(pt.lexers.common.parens_check("(()").kind).toBe("lack")
  expect(pt.lexers.common.parens_check("((()])").kind).toBe("mismatch")
  expect(pt.lexers.common.parens_check("((())))").kind).toBe("excess")
})

test("parens_depth", () => {
  expect(pt.lexers.common.parens_depth("(())")).toBe(0)
  expect(pt.lexers.common.parens_depth("((")).toBe(2)
  expect(pt.lexers.common.parens_depth("(()")).toBe(1)
})
