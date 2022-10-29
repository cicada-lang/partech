import { expect, test } from "vitest"
import * as Exp from "../exp"
import * as mods from "../mods"

function testPresent(present: Exp.Present): void {
  expect(present).toEqual(Exp.present(Exp.from_present(present)))
}

const { identifier, one_or_more, exp } = mods.exp

test("present", () => {
  testPresent(identifier)
  testPresent(exp)
  testPresent(one_or_more)
})
