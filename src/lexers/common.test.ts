import * as pt from ".."
import * as ut from "../ut"

{
  const text = "(())"
  const result = pt.lexers.common.check_parentheses(text)
  ut.assert_equal(result.kind, "balance")
}

{
  const text = "(()"
  const result = pt.lexers.common.check_parentheses(text)
  ut.assert_equal(result.kind, "lack")
}

{
  const text = "((()])"
  const result = pt.lexers.common.check_parentheses(text)
  ut.assert_equal(result.kind, "mismatch")
}

{
  const text = "((())))"
  const result = pt.lexers.common.check_parentheses(text)
  ut.assert_equal(result.kind, "excess")
}
