export function dayToNumber(day: string): number {
  const daysMap = new Map<string, number>([
    ["Sunday", 0],
    ["Monday", 1],
    ["Tuesday", 2],
    ["Wednesday", 3],
    ["Thursday", 4],
    ["Friday", 5],
    ["Saturday", 6],
  ]);

  return daysMap.get(day) ?? -1;
}
