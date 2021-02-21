import {
  farAwayQuotes,
  less24hQuotes,
  lessThanMonthQuotes,
  lessThanWeekQuotes,
} from '../../../data/quotes';

export const generateRandomNum = (arrLength: number) =>
  Math.floor(Math.random() * Math.floor(arrLength));

export const useRandomizedMessage = (days: number) => {
  console.log('days', days);
  if (days > 30) {
    return farAwayQuotes[generateRandomNum(farAwayQuotes.length)];
  }
  if (days > 7) {
    return lessThanMonthQuotes[generateRandomNum(lessThanMonthQuotes.length)];
  }
  if (days > 1) {
    return lessThanWeekQuotes[generateRandomNum(lessThanWeekQuotes.length)];
  }
  return less24hQuotes[generateRandomNum(less24hQuotes.length)];
};
