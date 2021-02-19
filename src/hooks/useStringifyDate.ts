import { TargetDate } from './../model';

export function useStringifyDate(targetDate: TargetDate): string {
  const { month, day, year } = targetDate;
  return `${day}/${month}/${year}`;
}
