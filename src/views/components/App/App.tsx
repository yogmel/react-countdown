import React, { useEffect, useState } from 'react';
import { DateType, TargetDate } from '../../../model';
import { useHistory, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import DatePicker from '../DatePicker/DatePicker';
import { AppViewModel } from '../../../viewmodels';
import { checkInvalidDate } from '../../shared/utils/checkInvalidDate';
import { AppWrapper } from './styled';
import CountdownWrapper from '../CountdownView/CountdownWrapper';

export interface AppProps {
  editor: AppViewModel;
  targetDateFromQuery: TargetDate;
}

function App(props: AppProps) {
  const history = useHistory();
  const locationSearch = useLocation().search;

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const {
    setTargetDate,
    setRandomMessage,
    getDateFromQuery,
    message,
  } = props.editor;
  const { targetDateFromQuery } = props;

  useEffect(() => {
    // on mount, check if all values from query params are valid
    if (checkInvalidDate(targetDateFromQuery)) {
      goToDatePicker();
    } else {
      setNewDateAndMessage();
    }
  }, [message]);

  const setNewDateAndMessage = () => {
    const formattedDate = getDateFromQuery(locationSearch, DateType.Moment);
    setTargetDate(formattedDate);
    setRandomMessage();
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
        />
      )}
    </AppWrapper>
  );
}

export default observer(App);
