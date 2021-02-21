import React, { useState } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { observer } from 'mobx-react';
import { SingleDatePicker } from 'react-dates';
import { Moment } from 'moment';
import { useHistory } from 'react-router-dom';
import { AppViewModel } from '../../../viewmodels';
import { useRemainingTime } from '../../shared/hooks';
import { TargetDate } from '../../../model';

export interface DatePickerProps {
  editor: AppViewModel;
  onDatePickerVisibility: (value: boolean) => void;
}

function DatePicker(props: DatePickerProps) {
  const {
    targetDate,
    setTargetDate,
    setRemainingTime,
    setRandomMessage,
  } = props.editor;
  const { onDatePickerVisibility } = props;
  const history = useHistory();

  const [focused, setFocused] = useState<boolean>(false);

  const handleFocusChange = (focused: boolean) => {
    setFocused(focused);
  };

  const handleOnChange = (date: Moment | null) => {
    if (date) {
      updateRemainingTime(date);
      setRandomMessage();
      goToCountdown(date);
    }
  };

  const updateRemainingTime = (date: Moment) => {
    const targetDate = new TargetDate(date);

    setRemainingTime(useRemainingTime(targetDate));
    setTargetDate(date);
  };

  const goToCountdown = (date: Moment) => {
    const { day, month, year } = new TargetDate(date);
    history.push(`?day=${day}&month=${month}&year=${year}`);
    onDatePickerVisibility(false);
  };

  return (
    <>
      <h2>Escolha uma data futura</h2>
      <SingleDatePicker
        id="targetDay"
        date={targetDate}
        onDateChange={(date) => handleOnChange(date)}
        focused={focused}
        onFocusChange={({ focused }) => handleFocusChange(focused)}
      />
    </>
  );
}

export default observer(DatePicker);
