import { Moment } from 'moment';

export class TargetDate {
  day: string | null;
  month: string | null;
  year: string | null;

  constructor(date: Moment) {
    this.day = date?.date().toString();
    this.month = (date?.month() + 1).toString();
    this.year = date?.year().toString();
  }
}
