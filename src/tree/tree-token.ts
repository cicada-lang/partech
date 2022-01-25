import * as Token from "../token"
import * as Tree from "../tree"
import { inspect } from "../ut/inspect"

export function token(tree: Tree.Tree): Token.Token {
  if (tree.kind === "Tree.leaf") {
    const { token } = tree
    return token
  } else {
    throw new Error("Expecting Tree.leaf.\n" + `- tree: ${inspect(tree)}\n`)
  }
}
