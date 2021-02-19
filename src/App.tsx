import React, { useEffect, useState } from 'react';
import './App.css';
import { TimeLeft } from './model';
import { useRemainingTime, useQuery, useStringifyDate } from './hooks';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory } from 'react-router-dom';

function App() {
  const query = useQuery();
  const history = useHistory();
  const targetDate = {
    day: query.get('day'),
    month: query.get('month'),
    year: query.get('year')
  };

  const [ time, setTime ] = useState<TimeLeft>(useRemainingTime(targetDate));
  const [ startDate, setStartDate ] = useState<Date>(new Date());
  const [ showDatePicker, setShowDatePicker ] = useState<boolean>(false);

  useEffect(() => {
    if(query.get('day') === null || query.get('month') === null || query.get('year') === null) {
      setShowDatePicker(true);
      history.push('/');
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(useRemainingTime(targetDate));
    }, 1000);
    
    return () => clearTimeout(timer);
  });

  const { days, hours, minutes, seconds } = time;

  const handleOnChange = (date: Date) => {
    console.log('date', date.getDate());
    setShowDatePicker(false);
    setStartDate(date);
    history.push(`?day=${date.getDate()}&month=${date.getMonth()}&year=${date.getFullYear()}`);
    console.log('query.get', query.get('day'));
    setTime(useRemainingTime({
      day: query.get('day'),
      month: query.get('month'),
      year: query.get('year')
    }));
  };

  const handleClick = () => {
    setShowDatePicker(true);
  };

  return (
    <div className="App">
      {!showDatePicker && (
        <>
          <header className="App-header">
            <h1>Tempo restante para {useStringifyDate(targetDate)}</h1>
            <div>{ days } dias { hours } horas { minutes } minutos { seconds } segundos</div>
          </header>
          <button onClick={handleClick}>Nova data</button>
        </>
      )}

      {showDatePicker && (
        <form>
          <DatePicker selected={startDate} onChange={handleOnChange} />
        </form>

      )}
    </div>
  );
}

export default App;
