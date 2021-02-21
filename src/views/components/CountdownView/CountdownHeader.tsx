import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TimeLeft } from '../../../model';
import {
  useDateQueryValues,
  useRemainingTime,
  useStringifyDate,
} from '../../shared/hooks';
import { Header, TextWrapper, Title } from './styled';

export interface CountdownHeaderProps {
  remainingTime: TimeLeft;
  setRemainingTime: (value: TimeLeft) => void;
}

export function CountdownHeader(props: CountdownHeaderProps) {
  const { setRemainingTime } = props;
  const { days, hours, minutes, seconds } = props.remainingTime;

  const locationSearch = useLocation().search;

  useEffect(() => {
    const timer = setTimeout(function () {
      const targetDate = useDateQueryValues(locationSearch);
      setRemainingTime(useRemainingTime(targetDate));
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <Header>
      <Title>
        Tempo restante para{' '}
        {useStringifyDate(useDateQueryValues(locationSearch))}
      </Title>
      <TextWrapper>
        {days} dias {hours} horas {minutes} minutos {seconds} segundos
      </TextWrapper>
    </Header>
  );
}
