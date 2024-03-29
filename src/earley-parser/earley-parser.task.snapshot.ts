import * as EarleyParser from "../earley-parser"
import { grammar, lexer } from "./earley-parser.recognize"

const parser = EarleyParser.create(grammar, {
  task: {
    verbose: true,
  },
})

function show(text: string): void {
  console.log(">>>", text)
  parser.recognize(lexer.lex(text))
  console.log()
}

show("a")
show("a-a")
show("a-a+a")
