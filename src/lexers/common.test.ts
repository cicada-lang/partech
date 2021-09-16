import * as pt from ".."
import * as ut from "../ut"

// NOTE parens_check

{
  const text = "(())"
  const result = pt.lexers.common.parens_check(text)
  ut.assert_equal(result.kind, "balance")
}

{
  const text = "(()"
  const result = pt.lexers.common.parens_check(text)
  ut.assert_equal(result.kind, "lack")
}

{
  const text = "((()])"
  const result = pt.lexers.common.parens_check(text)
  ut.assert_equal(result.kind, "mismatch")
}

{
  const text = "((())))"
  const result = pt.lexers.common.parens_check(text)
  ut.assert_equal(result.kind, "excess")
}

// NOTE parens_depth

{
  const text = "(())"
  const depth = pt.lexers.common.parens_depth(text)
  ut.assert_equal(depth, 0)
}

{
  const text = "(("
  const depth = pt.lexers.common.parens_depth(text)
  ut.assert_equal(depth, 2)
}

{
  const text = "(()"
  const depth = pt.lexers.common.parens_depth(text)
  ut.assert_equal(depth, 1)
}
