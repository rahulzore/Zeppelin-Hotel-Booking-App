import titleize from 'titleize';

export const rentalType = isShared =>  isShared? 'shared' : 'entire';

export const toUpperCase = value => value? titleize(value) : '';