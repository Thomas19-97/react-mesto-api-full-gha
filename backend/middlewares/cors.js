const allowedCors = [
  'https://localhost:3000',
  'http://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3001',
  'https://api.tom.nomoredomainsmonster',
  'https://tom.nomoredomainsmonster',
  'http://api.tom.nomoredomainsmonster',
  'http://tom.nomoredomainsmonster',
  'https://tom.nomoredomainsmonster.ru',
  'https://api.tom.nomoredomainsmonster.ru',
  'http://tom.nomoredomainsmonster.ru',
  'http://api.tom.nomoredomainsmonster.ru',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  res.header('Access-Control-Allow-Credentials', true);
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
