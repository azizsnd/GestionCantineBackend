import { HttpException, HttpStatus } from '@nestjs/common';

export function validateDates(startDateTime: Date, endDateTime: Date): void {
  if (startDateTime >= endDateTime) {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        message: 'La date de début doit être antérieure à la date de fin.',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  const currentDate = new Date();
  const startDateOnly = new Date(startDateTime);
  startDateOnly.setHours(0, 0, 0, 0); 

  const todayDateOnly = new Date(currentDate);
  todayDateOnly.setHours(0, 0, 0, 0); 
  
  if (startDateOnly <= todayDateOnly) {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        message: 'La date de début doit être supérieure à la date actuelle.',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
