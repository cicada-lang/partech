// x in x

export const grammars = {
  $start: "s",

  s: {
    $grammar: {
      "s:x": ['"x"'],
      "s:x_in_x": ['"x"', "s", '"x"'],
    },
  },
}
