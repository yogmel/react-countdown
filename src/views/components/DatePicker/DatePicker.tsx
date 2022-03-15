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
import { CheckboxWrapper } from './styled';
import { TitleWrapper } from './styled/TitleWrapper';

export interface DatePickerProps {
  editor: AppViewModel;
  onDatePickerVisibility: (value: boolean) => void;
}

function DatePicker(props: DatePickerProps) {
  const {
    anpanMode: defaultAnpanMode,
    targetDate,
    setTargetDate,
    setRemainingTime,
    setRandomMessage,
  } = props.editor;
  const { onDatePickerVisibility } = props;
  const history = useHistory();

  const [focused, setFocused] = useState<boolean>(false);
  const [anpanMode, setAnpanMode] = useState<boolean>(defaultAnpanMode);
  const [title, setTitle] = useState<string>('');

  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value.trim());
  };

  const setDocumentTitle = () => {
    document.title = 'Contagem regressiva para: ' + title;
  };

  const handleFocusChange = (focused: boolean) => {
    setFocused(focused);
  };

  const handleOnChange = (date: Moment | null) => {
    if (date) {
      updateRemainingTime(date);
      setRandomMessage();
      if (title) {
        setDocumentTitle();
      }
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

    history.push(
      `?day=${day}&month=${month}&year=${year}${
        anpanMode ? '&anpanMode=true' : ''
      }${title ? '&title=' + title : ''}`
    );

    onDatePickerVisibility(false);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnpanMode(e.target.checked);
  };

  return (
    <>
      <TitleWrapper>
        <h2>O que vai acontecer?</h2>
        <input onChange={updateTitle} />
      </TitleWrapper>
      <h2>Quando vai acontecer?</h2>
      <SingleDatePicker
        id="targetDay"
        date={targetDate}
        onDateChange={(date) => handleOnChange(date)}
        focused={focused}
        onFocusChange={({ focused }) => handleFocusChange(focused)}
      />
      <CheckboxWrapper>
        <label htmlFor="anpanMode">
          <input
            type="checkbox"
            defaultChecked={anpanMode}
            onChange={handleCheck}
          />
          <span>Habilitar Anpan Mode</span>
        </label>
      </CheckboxWrapper>
    </>
  );
}

export default observer(DatePicker);
