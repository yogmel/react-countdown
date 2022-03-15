import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TimeLeft } from '../../../model';
import {
  useDateQueryValues,
  useRemainingTime,
  useRetrieveMessage,
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
  const message = useRetrieveMessage(locationSearch);

  const setDocumentTitle = () => {
    if (message) {
      document.title = 'Contagem regressiva para: ' + message;
    }
  };

  useEffect(() => {
    setDocumentTitle();
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
      {message && <p>Ou para {message}</p>}
      <TextWrapper>
        {days} dias {hours} horas {minutes} minutos {seconds} segundos
      </TextWrapper>
    </Header>
  );
}

export default observer(CountdownHeader);
