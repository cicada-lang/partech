// Symbol expression (a.k.a. sexp) -- implemented by one_or_more

import * as pt from ".."

export const grammars = {
  one_or_more: pt.grammars.one_or_more,

  $start: "sexp",

  identifier: { $pattern: ["identifier"] },

  sexp: {
    $grammar: {
      "sexp:symbol": ["identifier"],
      "sexp:null": ['"("', '")"'],
      "sexp:list": ['"("', { $ap: ["one_or_more", "sexp"] }, '")"'],
    },
  },
}
