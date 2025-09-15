export const imagesMapperMiddleware = (req, res, next) => {
  if (!req.files?.length) {
    req.images = [];
    return next();
  }

  const baseUrl = req.uploadsBaseDirectory || '/uploads';

  req.images = req.files.map((file, index) => ({
    url: `${baseUrl}/${file.filename}`,
    isCover: index === 0,
    order: index,
  }));

  next();
};
