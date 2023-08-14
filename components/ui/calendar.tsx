'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayProps, DayPicker } from 'react-day-picker';
import moment from 'moment';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const data = [
  {
    property_id: 493543,
    room_type_id: 559843,
    period_start: '2023-05-01',
    period_end: '2023-08-23',
    available: 1,
    total_units: 1,
    is_available: true,
    booking_ids: [],
    closed_period_id: null,
  },
  {
    property_id: 493543,
    room_type_id: 559843,
    period_start: '2023-08-24',
    period_end: '2023-08-26',
    available: 0,
    total_units: 1,
    is_available: false,
    booking_ids: [],
    closed_period_id: null,
  },
  {
    property_id: 493543,
    room_type_id: 559843,
    period_start: '2023-08-27',
    period_end: '2023-12-31',
    available: 1,
    total_units: 1,
    is_available: true,
    booking_ids: [],
    closed_period_id: null,
  },
];

const findAvailability = (date: Date) => {
  const obj = data.find((d) => {
    const start = moment(d.period_start).toDate();
    const end = moment(d.period_end).toDate();

    if (date >= start && date <= end) {
      return true;
    }
  });

  return obj;
};

const availability = (date: Date) => {
  const availObject = findAvailability(date);

  if (!availObject) {
    throw new Error(
      `No availability found ${moment(date).format('YYYY-MM-DD')}`
    );
  }

  if (
    moment(date).isSame(moment(availObject.period_start)) &&
    !availObject.available
  ) {
    return 'arrival';
  }

  if (
    moment(date).isSame(moment(availObject.period_start)) &&
    availObject.available
  ) {
    return 'departure';
  }

  if (!availObject.available) {
    return 'occupied';
  }

  return '';
};

function DateTime(props: DayProps) {
  const isCurrentMonth =
    moment(props.date).month() === moment(props.displayMonth).month();

  return (
    <p
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center',
        isCurrentMonth ? availability(props.date) : ''
      )}
    >
      {isCurrentMonth && moment(props.date).format('DD')}
    </p>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
        ),
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside: 'text-muted-foreground opacity-50',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className='h-4 w-4' />,
        IconRight: ({ ...props }) => <ChevronRight className='h-4 w-4' />,
        Day: DateTime,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
