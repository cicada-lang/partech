// zero or more "x"s -- grammar with epsilon and optional

const pt = require("../..")

module.exports = {
  optional: pt.grammars.optional,

  $start: "xs",

  xs: {
    $grammar: {
      "xs:zero": [{ $ap: ["optional", '","'] }],
      "xs:more": ['"x"', { $ap: ["optional", '","'] }, "xs"],
    },
  },
}
