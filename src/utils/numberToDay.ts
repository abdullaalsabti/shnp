export function numberToDay(num: number): string {
  const numberToDayMap = new Map<number, string>([
    [0, "Sunday"],
    [1, "Monday"],
    [2, "Tuesday"],
    [3, "Wednesday"],
    [4, "Thursday"],
  ]);

  return numberToDayMap.get(num) ?? "Invalid";
}
