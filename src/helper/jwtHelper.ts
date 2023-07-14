import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const createJwtToken = (payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};


export const JwtHelper = {
  createJwtToken,
  verifyToken
}