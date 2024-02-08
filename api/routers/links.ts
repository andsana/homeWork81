import { Router } from 'express';
import { generateShortUrl } from '../utils/linkUtils';
import Link from '../models/Links';
import { LinkWithoutId } from '../types';
import { Types } from 'mongoose';

const linksRouter = Router();
linksRouter.get('/:shortUrl', async (req, res, next) => {
  try {
    let shortUrl: Types.ObjectId;
    try {
      shortUrl = new Types.ObjectId(req.params.shortUrl);
    } catch {
      return res.status(404).send({error: 'Wrong ObjectId!'});
    }


    const link = await Link.findOne({shortUrl});

    if (!link) {
      return res.status(404).send({error: 'Not found!'});
    }

    res.send(link);
  } catch (e) {
    next(e);
  }
});

linksRouter.post('/', async (req, res, next) => {
  try {
    const originalUrl = req.body.url;

    const shortUrl = await generateShortUrl();

    const linkData: LinkWithoutId = {
      originalUrl,
      shortUrl,
    };

    const link = new Link(linkData);
    await link.save();

    res.send(link);

  } catch (e) {
    next(e);
  }
});

export default linksRouter;
