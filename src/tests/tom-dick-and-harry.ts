// tom dick and harry

import * as pt from ".."

export const grammars = {
  one_or_more: pt.grammars.one_or_more,

  $start: "tom_dick_and_harry",

  tom_dick_and_harry: {
    $grammar: {
      "tom_dick_and_harry:name": ["name"],
      "tom_dick_and_harry:list": [
        { $ap: ["one_or_more", "name_entry"] },
        '"and"',
        "name",
      ],
    },
  },

  name: {
    $grammar: {
      "name:tom": ['"tom"'],
      "name:dick": ['"dick"'],
      "name:harry": ['"harry"'],
    },
  },

  name_entry: {
    $grammar: {
      "name_entry:name_alone": ["name"],
      "name_entry:name_comma": ["name", '","'],
    },
  },
}
