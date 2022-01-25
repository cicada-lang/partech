import { assert_equal } from "./assert-equal"
import { freshen_name } from "./freshen-name"

assert_equal("x1", freshen_name(new Set(["x"]), "x"))
assert_equal("x2", freshen_name(new Set(["x", "x1"]), "x"))
assert_equal("x3", freshen_name(new Set(["x", "x1", "x2"]), "x"))
