import * as Lexer from "../lexer"
import * as Value from "../value"
import * as Tree from "../tree"
import * as Span from "../span"
import * as EarleyParser from "../earley-parser"

export function gen_parse<A>(the: {
  preprocess?: (text: string) => string
  lexer: Lexer.Lexer
  grammar: Value.grammar
  matcher: (tree: Tree.Tree) => A
}): (text: string, offset?: number) => A {
  const parser = EarleyParser.create(the.grammar)
  return (text, offset = 0) => {
    if (the.preprocess) {
      text = the.preprocess(text)
    }
    const tokens = the.lexer
      .lex(text)
      .map((token) => ({ ...token, span: Span.shift(token.span, offset) }))
    const tree = parser.parse(tokens)
    return the.matcher(tree)
  }
}
