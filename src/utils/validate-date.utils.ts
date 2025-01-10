import { HttpException, HttpStatus } from '@nestjs/common';

export function validateDates(startDateTime: Date, endDateTime: Date): void {
  // Vérification de la validité des dates
  if (startDateTime >= endDateTime) {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        message: 'La date de début doit être antérieure à la date de fin.',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  // Vérification que la startDateTime est supérieure à la date actuelle
  const currentDate = new Date();
  const startDateOnly = new Date(startDateTime);
  startDateOnly.setHours(0, 0, 0, 0); // Fixer l'heure à 00:00:00

  const todayDateOnly = new Date(currentDate);
  todayDateOnly.setHours(0, 0, 0, 0); // Fixer l'heure à 00:00:00

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
