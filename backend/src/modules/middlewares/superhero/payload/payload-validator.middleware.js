import { createError } from '../../../../utils/errors.js';

export const payloadValidatorMiddleware = (req, res, next) => {

  if (!req.body) {
    return next(createError(400, 'Missing character data'));
  }

  const characterInfo = {
    nickname: req.body.nickname,
    realName: req.body.realName,
    originDescription: req.body.originDescription,
    superpowers: req.body.superpowers,
    catchPhrase: req.body.catchPhrase,
    images: req.files,
  }

  const missingFields = Object.entries(characterInfo)
    .filter(([key, prop]) => prop === undefined || prop === null || prop === '')
    .map(([key, prop]) => key);

  if (missingFields.length) {
      const err = new Error(`Missing required fields: ${missingFields.join(', ')}`);
      err.status = 400;
      return next(err);
  }

  next();
}