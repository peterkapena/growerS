import jwt from "jsonwebtoken";

export function encodeJwt(
  object: Object,
  options?: jwt.SignOptions | undefined
): string {
  //   console.log(process.env.PRIVATE_KEY);
  const privateKey = Buffer.from(process.env.PRIVATE_KEY, "base64").toString();

  return jwt.sign(object, privateKey, {
    ...(options && options),
    expiresIn: "24h",
    algorithm: "RS256",
  });
}

export function decodeJwt<T>(token: string): T | null {
  const publicKey = Buffer.from(process.env.PUBLIC_KEY, "base64").toString();
  const decoded = jwt.verify(token, publicKey) as T;  

  return decoded;
}
