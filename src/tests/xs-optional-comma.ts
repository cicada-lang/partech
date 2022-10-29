// zero or more "x"s -- grammar with epsilon and optional

import * as pt from ".."

export const grammars = {
  optional: pt.grammars.optional,

  $start: "xs",

  xs: {
    $grammar: {
      "xs:zero": [{ $ap: ["optional", '","'] }],
      "xs:more": ['"x"', { $ap: ["optional", '","'] }, "xs"],
    },
  },
}
