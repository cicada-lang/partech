import * as Exp from "../exp"
import * as mods from "../mods"
import { assert_equal } from "../ut/assert-equal"

function test(present: Exp.Present): void {
  assert_equal(present, Exp.present(Exp.from_present(present)))
}

const { identifier, one_or_more, exp } = mods.exp

test(identifier)
test(exp)
test(one_or_more)
