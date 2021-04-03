export const optional = {
  $fn: [
    "x",
    {
      $grammar: {
        "optional:zero": [],
        "optional:one": [{ head: "x" }],
      },
    },
  ],
}
