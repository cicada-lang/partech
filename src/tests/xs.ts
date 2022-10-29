// zero or more "x"s -- grammar with epsilon

export const grammars = {
  $start: "xs",

  xs: {
    $grammar: {
      "xs:zero": [],
      "xs:more": ['"x"', "xs"],
    },
  },
}
