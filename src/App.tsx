import React, { useEffect, useState } from 'react';
import './App.css';
import { useLocation } from 'react-router-dom';

interface TimeLeft {
  days: number,
  hours: number,
  minutes: number,
  seconds: number
}

interface TargetDate {
  day: string | null,
  month: string | null,
  year: string | null
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function getRemainingTime(targetDate: TargetDate): TimeLeft {
  const { day, month, year } = targetDate;

  const difference = +new Date(`${month}/${day}/${year}`) - +new Date();

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  return { 
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
}

function getStringifyDate(targetDate: TargetDate): string {
  const { month, day, year } = targetDate;
  return `${day}/${month}/${year}`;
}

function App() {
  const query = useQuery();
  const targetDate = {
    day: query.get('day'),
    month: query.get('month'),
    year: query.get('year')
  };

  const [ time, setTime ] = useState<TimeLeft>(getRemainingTime(targetDate));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(getRemainingTime(targetDate));
    }, 1000);
    
    return () => clearTimeout(timer);
  });

  const { days, hours, minutes, seconds } = time;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tempo restante para {getStringifyDate(targetDate)}</h1>
        <div>{ days } dias { hours } horas { minutes } minutos { seconds } segundos</div>
      </header>
    </div>
  );
}

export default App;
