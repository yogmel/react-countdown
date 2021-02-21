import { TargetDate } from '../../../model';

export function useDateQueryValues(locationSearch: string): TargetDate {
  const query = new URLSearchParams(locationSearch);

  return {
    day: query.get('day'),
    month: query.get('month'),
    year: query.get('year'),
  };
}
