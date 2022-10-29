import { expect, test } from "vitest"
import * as Mod from "../mod"
import * as mods from "../mods"

function testPresent(present: Mod.Present): void {
  expect(JSON.stringify(present)).toEqual(
    JSON.stringify(Mod.present(Mod.from_present(present))),
  )
}

test("present", () => {
  testPresent(mods.exp)
})
