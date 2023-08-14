'use client';

import React, { FC } from 'react';
import { Calendar } from '@/components/ui/calendar';

interface OwnProps {}

const BookingCalendar: FC<OwnProps> = ({}) => {
  return <Calendar className='px-10 py-10' mode='single' numberOfMonths={4} />;
};

export default BookingCalendar;
