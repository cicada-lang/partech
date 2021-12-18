import * as Span from "../span"
import * as Tree from "../tree"

export function span(tree: Tree.Tree): Span.Span {
  switch (tree.kind) {
    case "Tree.node": {
      return tree.span
    }
    case "Tree.leaf": {
      const { token } = tree
      return token.span
    }
  }
}
