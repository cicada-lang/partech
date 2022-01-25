export function inspect(x: any): string {
  return JSON.stringify(x, null, 2)
}
