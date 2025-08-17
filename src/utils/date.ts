import { parse } from 'date-fns';

const defaultRefDate = new Date('2004-03-01T04:00:00.000Z');

export const getDateFromString = (
  value: string,
  format: string = 'yyyy-MM-dd',
  referenceDate: Date = defaultRefDate,
) => {
  return parse(value, format, referenceDate);
};
