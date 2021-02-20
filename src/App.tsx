import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './styles/App.css';
import 'react-datepicker/dist/react-datepicker.css';
import { TimeLeft } from './model';
import { useRemainingTime, useQuery, useStringifyDate, useRandomizedMessage } from './hooks';
import { useHistory } from 'react-router-dom';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import { Moment } from 'moment';
import moment from 'moment';

function App() {
  const query = useQuery();
  const history = useHistory();
  const targetDate = {
    day: query.get('day'),
    month: query.get('month'),
    year: query.get('year')
  };

  const [ time, setTime ] = useState<TimeLeft>(useRemainingTime(targetDate));
  const [ showDatePicker, setShowDatePicker ] = useState<boolean>(false);
  const [ focused, setFocused ] = useState<boolean>(true);
  const [ momentDate, setMomentDate ] = useState<Moment | null>(null);
  const [ message, setMessage ] = useState<string>('');

  enum DateType {
    Day = 'day',
    Month = 'month',
    Year = 'year'
  }

  const checkDate = (dateType: DateType, value: string | null): boolean => {
    if (value === null) {
      return false;
    }

    switch(dateType) {
    case DateType.Day: 
      return !!value.match(/\d{1,2}/);
    case DateType.Month: 
      return !!value.match(/\d{1,2}/);
    case DateType.Year: 
      return !!value.match(/^\d{4}$/);
    default:
      return false;
    }
  };

  useEffect(() => {
    if(!checkDate(DateType.Day, query.get('day')) ||
       !checkDate(DateType.Month, query.get('month')) ||
       !checkDate(DateType.Year, query.get('year')))
    {
      setShowDatePicker(true);
      history.push('/');
      return;
    }
    const dateString = `${query.get('year')}-${query.get('month')}-${query.get('day')}`;

    setMomentDate(moment(dateString));
    setMessage(useRandomizedMessage(days));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(useRemainingTime(targetDate));
    }, 1000);
    
    return () => clearTimeout(timer);
  });

  const { days, hours, minutes, seconds } = time;

  const handleOnChange = (date: Moment | null) => {
    setShowDatePicker(false);
    setMomentDate(date);

    if (date) {
      const day = date?.date().toString();
      const month = (date?.month() + 1).toString();
      const year = date?.year().toString();

      history.push(`?day=${day}&month=${month}&year=${year}`);
      setTime(useRemainingTime({ day, month, year }));
      const { days } = useRemainingTime({ day, month, year });
      setMessage(useRandomizedMessage(days));
    }
  };

  const handleClick = () => {
    setShowDatePicker(true);
  };

  const handleFocusChange = (focused: boolean) => {
    setFocused(focused);
  };

  return (
    <div className="App">
      {!showDatePicker && (
        <>
          <header className="App-header">
            <h1>Tempo restante para {useStringifyDate(targetDate)}</h1>
            <div>{ days } dias { hours } horas { minutes } minutos { seconds } segundos</div>
          </header>

          <hr />

          <p className="quote">&quot;{message}&quot;</p>
          <button className="new-date-btn" onClick={handleClick}>Nova data</button>
        </>
      )}

      {showDatePicker && (
        <>
          <h2>Escolha uma data futura</h2>
          <SingleDatePicker
            date={momentDate}
            onDateChange={date => handleOnChange(date)}
            focused={focused}
            onFocusChange={({focused}) => handleFocusChange(focused)}
            id="targetDay"
          />
        </>

      )}
    </div>
  );
}

export default App;
