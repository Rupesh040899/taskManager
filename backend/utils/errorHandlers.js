export const notFound = (req, res, next) => {
  res.status(404);
  res.json({ error: `Not found - ${req.originalUrl}` });
};

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(res.statusCode === 200 ? 500 : res.statusCode);
  res.json({ error: err.message || 'Server Error' });
};
