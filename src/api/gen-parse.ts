import * as Lexer from "../lexer"
import * as Value from "../value"
import * as Tree from "../tree"
import * as Span from "../span"
import * as EarleyParser from "../earley-parser"

export function gen_parse<A>(opts: {
  preprocess?: (text: string) => string
  lexer: Lexer.Lexer
  grammar: Value.grammar
  matcher: (tree: Tree.Tree) => A
}): (text: string, offset?: number) => A {
  const { preprocess, lexer, grammar, matcher } = opts

  const parser = EarleyParser.create(grammar)
  return (text, offset = 0) => {
    if (preprocess) {
      text = preprocess(text)
    }
    const tokens = lexer
      .lex(text)
      .map((token) => ({ ...token, span: Span.shift(token.span, offset) }))
    const tree = parser.parse(tokens)
    return matcher(tree)
  }
}
