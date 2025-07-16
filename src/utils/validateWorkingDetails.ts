import type { WorkingDetailsModel } from "./formikUtils";
import { numberToDay } from "./numberToDay";

export default function validateWorkingDetail(
  currentDetail: WorkingDetailsModel,
  details: WorkingDetailsModel[]
): string[] {
  const errors: string[] = [];

  if (currentDetail.toHour <= currentDetail.fromHour) {
    errors.push(
      `Invalid time interval 'to': ${currentDetail.to} must be after 'from': ${currentDetail.from}`
    );
  }

  const groupedByDay: Record<number, WorkingDetailsModel[]> = {};
  for (const detail of details) {
    if (!groupedByDay[detail.day]) {
      groupedByDay[detail.day] = [];
    }

    groupedByDay[detail.day].push(detail);
  }

  console.log(groupedByDay);

  for (const day in groupedByDay) {
    const intervals = groupedByDay[day].sort(
      (value1, value2) => value1.fromHour - value2.fromHour
    );
    if (intervals.length > 1) {
      for (let i = 1; i < intervals.length; i++) {
        const prev = intervals[i - 1];
        const current = intervals[i];
        if (current.fromHour < prev.toHour) {
          errors.push(
            `Overlapping intervals on ${numberToDay(parseInt(day))}: ${
              prev.from
            }-${prev.to} and ${current.from}-${current.to}`
          );
        }
      }
    }
  }

  return errors;
}
