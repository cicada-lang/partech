import * as deep_diff from "deep-diff"
import { equal } from "./equal"
import { inspect } from "./inspect"

export function assert_equal(x: any, y: any): void {
  if (!equal(x, y)) {
    throw Error(
      "assert_equal fail\n" +
        "the following two values are not equal\n" +
        `x: ${inspect(x)}\n` +
        `y: ${inspect(y)}\n` +
        `diff: ${inspect(deep_diff.diff(x, y))}\n`,
    )
  }
}
