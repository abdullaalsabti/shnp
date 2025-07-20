export default function splitAtCapitalLetter(s: string): string {
  if (!s) return "";

  // Split at capital letters and join with spaces
  return s
    .split(/(?=[A-Z])/)
    .filter((part) => part.length > 0)
    .join(" ");
}
