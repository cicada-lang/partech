// line of more then one dashes

import * as pt from ".."

export const grammars = {
  one_or_more: pt.grammars.one_or_more,

  $start: "dashline",

  dashline: {
    $grammar: {
      "dashline:dashline": ['"-"', { $ap: ["one_or_more", '"-"'] }],
    },
  },
}
