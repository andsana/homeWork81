import { randomBytes } from 'crypto';
import Link from '../models/Links';

export const generateShortUrl = async (): Promise<string> => {
  let shortUrl: string;

  do {
    shortUrl = randomBytes(4).toString('hex').toUpperCase();
  } while (await Link.findOne({shortUrl}));

  return shortUrl;
};
