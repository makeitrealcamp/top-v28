import { expressjwt as jwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';

export const auth = jwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});

export const owner = (req, res, next) => {
  const { auth = {}, data = {} } = req;
  const { sub: ownerId } = auth;
  const { userId } = data;

  if (ownerId !== userId) {
    return next({
      message: 'Forbidden',
      status: 403,
    });
  }

  next();
};
