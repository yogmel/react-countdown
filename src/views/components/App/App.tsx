import React, { useEffect, useState } from 'react';
import { useRandomizedMessage, useDateQueryValues } from './../../shared/hooks';
import { TargetDate } from '../../../model';
import { useHistory, useLocation } from 'react-router-dom';
import moment from 'moment';
import { observer } from 'mobx-react';
import DatePicker from '../DatePicker/DatePicker';
import { AppViewModel } from '../../../viewmodels';
import { checkFullValidDate } from '../../shared/utils/checkValidDateType';
import { AppWrapper } from './styled';
import CountdownWrapper from '../CountdownView/CountdownWrapper';

export interface AppProps {
  editor: AppViewModel;
  targetDateFromQuery: TargetDate;
}

function App(props: AppProps) {
  const history = useHistory();
  const locationSearch = useLocation().search;

  const { remainingTime, setTargetDate, setMessage, message } = props.editor;
  const { targetDateFromQuery } = props;

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    // on mount, check if all values from query params are valid
    if (checkFullValidDate(targetDateFromQuery)) {
      goToDatePicker();
    } else {
      setNewDateAndMessage();
    }
  }, [message]);

  const setNewDateAndMessage = () => {
    const { days } = remainingTime;
    const { day, month, year } = useDateQueryValues(locationSearch);
    const dateString = `${year}-${month}-${day}`;
    setTargetDate(moment(dateString));
    setNewMessage(days);
  };

  const setNewMessage = (days: number) => {
    setMessage(useRandomizedMessage(days));
  };

  const goToDatePicker = () => {
    setShowDatePicker(true);
    history.push('/');
  };

  const handleDatePickerVisibility = (value: boolean) => {
    setShowDatePicker(value);
  };

  return (
    <AppWrapper>
      {!showDatePicker && (
        <CountdownWrapper
          editor={props.editor}
          handleDatePickerVisibility={handleDatePickerVisibility}
        />
      )}
      {showDatePicker && (
        <DatePicker
          editor={props.editor}
          onDatePickerVisibility={handleDatePickerVisibility}
          setNewMessage={setNewMessage}
        />
      )}
    </AppWrapper>
  );
}

export default observer(App);
