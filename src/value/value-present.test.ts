import { expect, test } from "vitest"
import * as Env from "../env"
import * as Exp from "../exp"
import * as Mod from "../mod"
import * as mods from "../mods"
import * as Value from "../value"

function testPresent(
  mod: Mod.Mod,
  env: Env.Env,
  exp_present: any,
  value_present: any,
  opts: Value.PresentOpts = { on_grammar: "as_exp" },
): void {
  const exp = Exp.from_present(exp_present)
  const values = Exp.evaluate(mod, env, exp)
  expect(values.length).toBe(1)
  const value = values[0]
  expect(Value.present(value, opts)).toEqual(value_present)
}

test("present", () => {
  const mod = Mod.from_present(mods.exp)
  const env = new Map()

  // Exp.v

  testPresent(
    mod,
    env,
    "exp",
    {
      "exp:var": [{ name: "identifier" }],
      "exp:fn": [
        '"("',
        { name: "identifier" },
        '")"',
        '"="',
        '">"',
        { body: "exp" },
      ],
      "exp:ap": [
        { head: "identifier" },
        { tail: { $ap: ["one_or_more", '"("', "exp", '")"'] } },
      ],
    },
    { on_grammar: "as_exp" },
  )

  // Exp.ap

  testPresent(
    mod,
    env,
    { $ap: ["one_or_more", '"("', "exp", '")"'] },
    {
      "one_or_more:one": [{ value: "x" }],
      "one_or_more:more": [
        { head: "x" },
        { tail: { $ap: ["one_or_more", "x"] } },
      ],
    },
    { on_grammar: "as_exp" },
  )

  testPresent(
    mod,
    env,
    { $ap: ["one_or_more", '"("', "exp", '")"'] },
    {
      "one_or_more:one": ['"("', { value: "exp" }, '")"'],
      "one_or_more:more": [
        '"("',
        { head: "exp" },
        '")"',
        { tail: "one_or_more" },
      ],
    },
    { on_grammar: "force_one_step" },
  )
})
