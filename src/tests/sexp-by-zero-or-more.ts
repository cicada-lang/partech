// Symbol expression (a.k.a. sexp) -- implemented by zero_or_more

import * as pt from ".."

export const grammars = {
  zero_or_more: pt.grammars.zero_or_more,

  $start: "sexp",

  identifier: { $pattern: ["identifier"] },

  sexp: {
    $grammar: {
      "sexp:symbol": ["identifier"],
      "sexp:list": ['"("', { $ap: ["zero_or_more", "sexp"] }, '")"'],
    },
  },
}
