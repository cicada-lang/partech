import * as ut from "../ut"
import * as Token from "../token"
import * as Span from "../span"

export type Tree = node | leaf

export type Head = {
  name: string
  kind: string
}

export type Body = ut.Obj<Tree>

export type node = {
  kind: "Tree.node"
  head: Head
  body: Body
  span: Span.Span
}

export const node = (head: Head, body: Body, span: Span.Span): node => ({
  kind: "Tree.node",
  head,
  body,
  span,
})

export type leaf = {
  kind: "Tree.leaf"
  token: Token.Token
}

export const leaf = (token: Token.Token): leaf => ({
  kind: "Tree.leaf",
  token,
})
