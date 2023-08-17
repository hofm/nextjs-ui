'use client';

import React, { FC, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import moment from 'moment';
import { DayProps } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { useBookingAvailability } from './useBookingAvailability';

const OwnDay = (props: DayProps) => {
  const { get } = useBookingAvailability();
  const isCurrentMonth =
    moment(props.date).month() === moment(props.displayMonth).month();

  return (
    <div>
      <p
        className={cn(
          'inline-flex h-7 w-14 items-center justify-center text-muted-foreground',
          isCurrentMonth ? get(props.date) : ''
        )}
      >
        {isCurrentMonth && moment(props.date).format('DD')}
      </p>
      <p
        className={cn(
          'inline-flex h-7 w-14 items-center justify-center text-muted-foreground',
          isCurrentMonth ? get(props.date) : ''
        )}
      >
        120€
      </p>
    </div>
  );
};

const BookingCalendar: FC = () => {
  const { fromMonth, toMonth, numberOfMonths } = useBookingAvailability();
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <section className='bg-[#EDEDED]'>
      <div className='rx ry inner-block'>
        <h2 className='responsive-heading text-center'>Belegungskalender</h2>
        <div className='mx-auto w-fit'>
          <Calendar
            fromMonth={fromMonth}
            toMonth={toMonth}
            className='px-10 py-10'
            mode='single'
            numberOfMonths={numberOfMonths}
            pagedNavigation
            components={{
              Day: OwnDay,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default BookingCalendar;
