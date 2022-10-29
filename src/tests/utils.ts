import * as pt from ".."
import * as Mod from "../mod"

export function createParser(grammars: Mod.Present, name: string) {
  return pt.gen_parse({
    preprocess: pt.preprocess.erase_comment,
    lexer: pt.lexers.common,
    grammar: pt.grammar_start(grammars, name),
    matcher: (tree) => tree,
  })
}
