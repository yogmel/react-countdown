import { makeAutoObservable } from 'mobx';
import moment from 'moment';
import { Moment } from 'moment';
import {
  anpanBirthdayQuote,
  anpanQuotes,
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
  private _anpanMode: boolean = false;

  constructor(private _remainingTime: TimeLeft) {
    makeAutoObservable(this);
    this.getDateFromQuery = this.getDateFromQuery.bind(this);
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

  get anpanMode(): boolean {
    return this._anpanMode;
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

  setAnpanMode = (value: boolean) => {
    this._anpanMode = value;
  };

  checkAnpanBDay = (): boolean => {
    return this.targetDate?.date() === 17 && this.targetDate.month() === 5;
  };

  setRandomMessage = () => {
    if (this.anpanMode) {
      if (this.checkAnpanBDay()) {
        return this.setMessage(
          anpanBirthdayQuote[generateRandomNum(anpanBirthdayQuote.length)]
        );
      }
      return this.setMessage(
        anpanQuotes[generateRandomNum(anpanQuotes.length)]
      );
    }

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

    this.setAnpanMode(query.get('anpanMode') === 'true');

    const dayNumber = targetDate.day && parseInt(targetDate.day) + 1;

    switch (format) {
      case DateType.TargetDate:
        return targetDate;
      case DateType.Moment:
        return moment(`${targetDate.year}-${targetDate.month}-${dayNumber}`);
      default:
        return null;
    }
  }
}
