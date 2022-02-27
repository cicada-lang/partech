import * as pt from ".."
import { assert_equal } from "../ut/assert-equal"

// NOTE parens_check

{
  const text = "define-node ->"
  const tokens = pt.lexers.lisp.lex(text)
  assert_equal(tokens.length, 3)
}

{
  const text = "define-node"
  const tokens = pt.lexers.lisp.lex(text)
  assert_equal(tokens.length, 1)
}
