export function erase_comment(text: string): string {
  return text
    .split("\n")
    .map((line) => line_erase_comment(line))
    .join("\n")
}

const double_quoted_string = new RegExp('\\s*("(\\\\.|[^"])*")\\s*')

function line_erase_comment(line: string): string {
  // NOTE The `//` in `double_quoted_string` should not be viewed as comment.
  if (line.replace(double_quoted_string, "").indexOf("//") === -1) {
    return line
  }

  const i = line.indexOf("//")
  if (i === -1) {
    return line
  } else {
    const remain = line.slice(0, i)
    const erased = line.slice(i).replace(/./g, " ")
    return remain + erased
  }
}
