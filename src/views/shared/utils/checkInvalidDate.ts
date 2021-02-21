import { TargetDate } from '../../../model';

export enum DateType {
  Day = 'day',
  Month = 'month',
  Year = 'year',
}

export const checkValidDateType = (
  dateType: DateType,
  value: string | null
): boolean => {
  if (value === null) {
    return false;
  }

  switch (dateType) {
    case DateType.Day:
      return !!value.match(/\d{1,2}/);
    case DateType.Month:
      return !!value.match(/\d{1,2}/);
    case DateType.Year:
      return !!value.match(/^\d{4}$/);
    default:
      return false;
  }
};

export const checkInvalidDate = (queryDate: TargetDate) => {
  return (
    !checkValidDateType(DateType.Day, queryDate.day) ||
    !checkValidDateType(DateType.Month, queryDate.month) ||
    !checkValidDateType(DateType.Year, queryDate.year)
  );
};
