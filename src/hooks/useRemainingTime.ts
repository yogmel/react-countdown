import { TargetDate, TimeLeft } from '../model';

export function useRemainingTime(targetDate: TargetDate): TimeLeft {
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
