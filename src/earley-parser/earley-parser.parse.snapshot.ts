import { lexer, parser } from "./earley-parser.parse"

function show(text: string): void {
  const tree = parser.parse(lexer.lex(text))
  console.log(JSON.stringify(tree, null, 2))
}

show("(a)")
show("(a)(a)")
show("(a)(a)(a)")
show("(a-a)")
show("(a-a+a)")
show("(a)(a)(a)(a)(a)(a)(a)(a)")
show("(a-a)(a-a)(a-a)")
show("(a-a+a)(a-a+a)(a-a+a)")
show("(a)(a-a)(a-a+a)")
