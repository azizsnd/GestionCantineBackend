import * as crypto from 'crypto';

export function generateRandomPassword(length: number = 12): string {
  return crypto.randomBytes(length / 2).toString('hex'); // Génère un mot de passe hexadécimal.
}
