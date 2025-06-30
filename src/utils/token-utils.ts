import { hash, compare } from 'bcryptjs'

export async function hashToken(token: string) {
  return await hash(token, 10)
}

export async function verifyToken(token: string, hashedToken: string) {
  return await compare(token, hashedToken)
}
