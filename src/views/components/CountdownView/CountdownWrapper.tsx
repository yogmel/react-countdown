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
  const { remainingTime, setRemainingTime, message } = props.editor;

  const [quote, setQuote] = useState<string>(message);

  useEffect(() => setQuote(message), [message]);

  return (
    <>
      <CountdownHeader
        remainingTime={remainingTime}
        setRemainingTime={setRemainingTime}
      />
      <Divider />
      <CountdownQuoteButton
        message={quote}
        handleDatePickerVisibility={handleDatePickerVisibility}
      />
    </>
  );
}

export default observer(CountdownWrapper);
