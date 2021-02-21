import { makeAutoObservable } from 'mobx';
import { Moment } from 'moment';
import { TimeLeft } from '../model';

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
}
