import React, { useState } from 'react';
import { Button, Quote } from './styled';

export interface CountdownQuoteButtonProps {
  message: string;
  handleDatePickerVisibility: (value: boolean) => void;
}

export function CountdownQuoteButton(props: CountdownQuoteButtonProps) {
  const { message, handleDatePickerVisibility } = props;

  return (
    <>
      <div>
        <Quote>&quot;{message}&quot;</Quote>
        <Button onClick={() => handleDatePickerVisibility(true)}>
          Nova data
        </Button>
      </div>
    </>
  );
}
