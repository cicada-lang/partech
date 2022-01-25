import * as Mod from "../mod"
import * as mods from "../mods"
import { assert_equal } from "../ut/assert-equal"

function test(present: Mod.Present): void {
  assert_equal(present, Mod.present(Mod.from_present(present)))
}

test(mods.exp)
