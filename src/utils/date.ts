import { parse, isAfter, isEqual, differenceInDays } from 'date-fns';
import { INTERVALS } from 'constants/intervals.enum';

const defaultRefDate = new Date('2004-03-01T04:00:00.000Z');

export const getDateFromString = (
  value: string,
  format: string = 'yyyy-MM-dd',
  referenceDate: Date = defaultRefDate,
) => {
  return parse(value, format, referenceDate);
};

export const isValidRange = (from?: string, to?: string) => {
  if (!!from && !!to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    const invalid = isAfter(fromDate, toDate);
    return !invalid;
  }
  return false;
};

export const getInterval = (from?: string, to?: string) => {
  if (!!from && !!to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const dif = differenceInDays(toDate, fromDate);
    if (!dif || dif <= 61) return INTERVALS.DAILY;
    if (dif && dif <= 365) return INTERVALS.MONTHLY;
    return INTERVALS.YEARLY;
  }
};
