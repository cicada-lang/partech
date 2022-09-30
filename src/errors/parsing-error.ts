import * as Span from "../span"
import { BaseError } from "./base-error"

export class ParsingError extends BaseError {
  message: string
  span: Span.Span

  constructor(message: string, opts: { span: Span.Span }) {
    super(message)
    this.message = message
    this.span = opts.span
  }

  report(context: string) {
    return [
      `I found syntax error in code:`,
      ``,
      Span.report(this.span, context),
      ``,
      this.concise_message,
    ].join("\n")
  }

  get concise_message(): string {
    const lines = this.message.split("\n")
    if (lines.length > 7) {
      return [
        // NOTE Show first 7 lines, for first three entres.
        // TODO This should be improved.
        ...lines.slice(0, 7),
        " and so on ...",
      ].join("\n")
    } else {
      return this.message
    }
  }
}
