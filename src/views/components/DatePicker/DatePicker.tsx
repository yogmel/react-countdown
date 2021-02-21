import React, { useState } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { observer } from 'mobx-react';
import { SingleDatePicker } from 'react-dates';
import { Moment } from 'moment';
import { useHistory } from 'react-router-dom';
import { AppViewModel } from '../../../viewmodels';
import { useRandomizedMessage, useRemainingTime } from '../../shared/hooks';

export interface DatePickerProps {
  editor: AppViewModel;
  onDatePickerVisibility: (value: boolean) => void;
  setNewMessage: (days: number) => void;
}

function DatePicker(props: DatePickerProps) {
  const {
    targetDate,
    setTargetDate,
    setRemainingTime,
    setMessage,
  } = props.editor;
  const { onDatePickerVisibility, setNewMessage } = props;
  const history = useHistory();

  const [focused, setFocused] = useState<boolean>(false);

  const handleFocusChange = (focused: boolean) => {
    setFocused(focused);
  };

  const handleOnChange = (date: Moment | null) => {
    onDatePickerVisibility(false);
    setTargetDate(date);

    if (date) {
      const day = date?.date().toString();
      const month = (date?.month() + 1).toString();
      const year = date?.year().toString();

      history.push(`?day=${day}&month=${month}&year=${year}`);
      setRemainingTime(useRemainingTime({ day, month, year }));
      const { days } = useRemainingTime({ day, month, year });
      setNewMessage(days);
    }
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
