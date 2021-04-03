import * as Tree from "../tree"

export function optional_matcher<A>(tree: Tree.Tree): null | Tree.Tree {
  return Tree.matcher({
    "optional:zero": ({ value }) => null,
    "optional:one": ({ head }) => head,
  })(tree)
}
