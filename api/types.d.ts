export interface Link {
    _id: string;
    originalUrl: string;
    shortUrl: string;
}

export type LinkWithoutId = Omit<Link, '_id'>;