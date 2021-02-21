import { observer } from 'mobx-react';
import React, { ReactElement, useEffect, useState } from 'react';
import { AppViewModel } from '../../../viewmodels';
import { CountdownHeader } from './CountdownHeader';
import { CountdownQuoteButton } from './CountdownQuoteButton';
import { Divider } from './styled';

export interface CountdownWrapperProps {
  editor: AppViewModel;
  handleDatePickerVisibility: (value: boolean) => void;
}

function CountdownWrapper(props: CountdownWrapperProps): ReactElement {
  const { handleDatePickerVisibility } = props;
  const {
    remainingTime,
    setRemainingTime,
    setRandomMessage,
    message,
  } = props.editor;

  useEffect(() => {
    if (message === '') {
      setRandomMessage();
    }
  }, []);

  return (
    <>
      <CountdownHeader
        remainingTime={remainingTime}
        setRemainingTime={setRemainingTime}
      />
      <Divider />
      <CountdownQuoteButton
        message={message}
        handleDatePickerVisibility={handleDatePickerVisibility}
      />
    </>
  );
}

export default observer(CountdownWrapper);
