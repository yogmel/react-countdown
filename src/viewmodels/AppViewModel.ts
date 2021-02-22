import { makeAutoObservable } from 'mobx';
import moment from 'moment';
import { Moment } from 'moment';
import {
  farAwayQuotes,
  less24hQuotes,
  lessThanMonthQuotes,
  lessThanWeekQuotes,
} from '../data/quotes';
import { DateType, TargetDate, TimeLeft } from '../model';
import { generateRandomNum } from '../views/shared/utils';

export class AppViewModel {
  private _targetDate: Moment | null = null;
  private _message: string = '';

  constructor(private _remainingTime: TimeLeft) {
    makeAutoObservable(this);
  }

  get remainingTime(): TimeLeft {
    return this._remainingTime;
  }

  get targetDate(): Moment | null {
    return this._targetDate;
  }

  get message(): string {
    return this._message;
  }

  setRemainingTime = (value: TimeLeft) => {
    this._remainingTime = value;
  };

  setTargetDate = (value: Moment | null) => {
    this._targetDate = value;
  };

  setMessage = (value: string) => {
    this._message = value;
  };

  setRandomMessage = () => {
    const { days } = this.remainingTime;
    if (days > 30) {
      this.setMessage(farAwayQuotes[generateRandomNum(farAwayQuotes.length)]);
      return;
    }
    if (days > 7) {
      this.setMessage(
        lessThanMonthQuotes[generateRandomNum(lessThanMonthQuotes.length)]
      );
      return;
    }
    if (days > 1) {
      this.setMessage(
        lessThanWeekQuotes[generateRandomNum(lessThanWeekQuotes.length)]
      );
      return;
    }
    this.setMessage(less24hQuotes[generateRandomNum(less24hQuotes.length)]);
  };

  getDateFromQuery(locationSearch: string, format: DateType.Moment): Moment;
  getDateFromQuery(
    locationSearch: string,
    format: DateType.TargetDate
  ): TargetDate;
  getDateFromQuery(
    locationSearch: string,
    format: DateType
  ): TargetDate | Moment | null {
    const query = new URLSearchParams(locationSearch);
    const targetDate = {
      day: query.get('day'),
      month: query.get('month'),
      year: query.get('year'),
    };

    switch (format) {
      case DateType.TargetDate:
        return targetDate;
      case DateType.Moment:
        return moment(
          `${targetDate.year}-${targetDate.month}-${targetDate.day}`
        );
      default:
        return null;
    }
  }
}
