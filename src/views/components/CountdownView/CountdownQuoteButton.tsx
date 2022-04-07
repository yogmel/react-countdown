import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Quote } from './styled';

export interface CountdownQuoteButtonProps {
  message: string;
  handleDatePickerVisibility: (value: boolean) => void;
}

export function CountdownQuoteButton(props: CountdownQuoteButtonProps) {
  const { message, handleDatePickerVisibility } = props;
  const history = useHistory();

  const handleClick = useCallback(() => {
    history.replace({ pathname: '/' });
    handleDatePickerVisibility(true);
  }, []);

  return (
    <>
      <div>
        <Quote>&quot;{message}&quot;</Quote>
        <Button onClick={handleClick}>Nova data</Button>
      </div>
    </>
  );
}
