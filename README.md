# Partech

Parsing Techniques -- A language for writing grammar and generate parser.

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

TODO

## Examples

TODO

## Thanks

Thank you, Noam Chomsky, for [Generative grammar](https://en.wikipedia.org/wiki/Generative_grammar) and [Chomsky hierarchy](https://en.wikipedia.org/wiki/Chomsky_hierarchy).

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

It is assumed that all non draft PRs are ready to be merged.
If your PR is not ready to be merged yet, please make it a draft PR:

- [Creating draft PR](https://github.blog/2019-02-14-introducing-draft-pull-requests)
- [Changing a PR to draft](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/changing-the-stage-of-a-pull-request)

During the development of your PR, you can make use of
the [TODO.md](TODO.md) file to record ideas temporarily,
and this file should be clean again at the end of your development.

## License

[GPLv3](LICENSE)
