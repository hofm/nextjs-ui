import bookingAvailability from '../../lib/bookingAvailability';
import { useMediaQuery } from '../hooks/useMediaQuery';
import moment from 'moment';

const mappingBreakpointToNumberOfMonths: Record<string, number> = {
  sm: 1,
  md: 1,
  lg: 2,
  xl: 2,
  '2xl': 3,
};

const getVisibleMonths = (breakpoint: string | undefined) => {
  return breakpoint ? mappingBreakpointToNumberOfMonths[breakpoint] : 1;
};

export const useBookingAvailability = () => {
  const [breakpoint] = useMediaQuery();

  const startDate = moment(bookingAvailability.getStartDate());
  const endDate = moment(bookingAvailability.getEndDate());
  const amountOfMonths = endDate.diff(startDate, 'months');
  const rest = amountOfMonths % getVisibleMonths(breakpoint);

  return {
    fromMonth: new Date(),
    toMonth: moment(bookingAvailability.getEndDate())
      .subtract(getVisibleMonths(breakpoint) - rest, 'month')
      .toDate(),
    numberOfMonths: getVisibleMonths(breakpoint),
    get: (date: Date) => bookingAvailability.get(date),
  };
};
