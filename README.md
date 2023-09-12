# Partech

Parsing Techniques -- A language for writing grammars and generating parsers.

- Named after Dick Grune and Ceriel J.H. Jacobs' book ["Parsing Techniques -- A Practical Guide"](https://www.amazon.com/Parsing-Techniques-Practical-Monographs-Computer/dp/1441919015).
- Embedded in JavaScript/TypeScript.
- Inspired by [Invisible XML](https://homepages.cwi.nl/~steven/ixml/).
- Implements [Earley parser](https://en.wikipedia.org/wiki/Earley_parser),
  which can handle the full [CFG](https://en.wikipedia.org/wiki/Context-free_grammar).

## Usages

Install the package:

```sh
npm install @cicada-lang/partech
```

TODO This package is used in many languages of cicada project,
but the API of this package is not stable yet.

## Examples

TODO

## Thanks

Thank you, [Noam Chomsky](https://en.wikipedia.org/wiki/Noam_Chomsky), for [Generative grammar](https://en.wikipedia.org/wiki/Generative_grammar) and [Chomsky hierarchy](https://en.wikipedia.org/wiki/Chomsky_hierarchy).

Thank you, Dick Grune and Ceriel J.H. Jacobs, for writing a great textbook about parsing.

Thank you, [Steven Pemberton](https://homepages.cwi.nl/~steven/), for your works about XML and designing [the ABC programming language](<https://en.wikipedia.org/wiki/ABC_(programming_language)>).

## Development

```sh
npm install           # Install dependencies
npm run build         # Compile `src/` to `lib/`
npm run build:watch   # Watch the compilation
npm run format        # Format the code
npm run test          # Run test
npm run test:watch    # Watch the testing
```

## Contributions

To make a contribution, fork this project and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

Remember to add yourself to [AUTHORS](AUTHORS).
Your line belongs to you, you can write a little
introduction to yourself but not too long.

## License

[GPLv3](LICENSE)
