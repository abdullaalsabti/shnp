export default function toTitleCase(title: string): string {
  return title
    .toLowerCase()
    .split(" ")
    .map((word) =>
      word === "iban"
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}
