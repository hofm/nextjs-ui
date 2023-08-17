import moment from 'moment';

export type Availability = 'arrival' | 'departure' | 'occupied' | 'available';

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

const getObject = (date: Date) => {
  const obj = data.find((d) => {
    const start = moment(d.period_start).toDate();
    const end = moment(d.period_end).toDate();

    if (date >= start && date <= end) {
      return true;
    }
  });

  return obj;
};

const getStartObject = () => {
  return data.reduce((a, b) => (a.period_start < b.period_start ? a : b));
};

const getEndObject = () => {
  return data.reduce((a, b) => (a.period_start > b.period_start ? a : b));
};

const get = (date: Date): Availability => {
  const availabilityObject = getObject(date);

  if (!availabilityObject) {
    throw new Error(
      `No availability found ${moment(date).format('YYYY-MM-DD')}`
    );
  }

  if (
    moment(date).isSame(moment(availabilityObject.period_start)) &&
    !availabilityObject.available
  ) {
    return 'arrival';
  }

  if (
    moment(date).isSame(moment(availabilityObject.period_start)) &&
    availabilityObject.available
  ) {
    return 'departure';
  }

  if (!availabilityObject.available) {
    return 'occupied';
  }

  return 'available';
};

const bookingAvailability = {
  get,
  getStartDate: () => moment(getStartObject().period_start).toDate(),
  getEndDate: () => moment(getEndObject().period_end).toDate(),
};

export default bookingAvailability;
