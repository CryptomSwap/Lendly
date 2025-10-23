import bcrypt from 'bcrypt';
import { prisma } from './prisma';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function getCurrentUser(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      verification: true,
    },
  });
}

export async function createUser(email: string, password: string, name: string) {
  const hashedPassword = await hashPassword(password);
  
  return prisma.user.create({
    data: {
      email,
      hashedPassword,
      name,
    },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: {
      verification: true,
    },
  });
}

export async function verifyUserCredentials(email: string, password: string) {
  const user = await getUserByEmail(email);
  
  if (!user || !user.hashedPassword) {
    return null;
  }
  
  const isValid = await comparePassword(password, user.hashedPassword);
  
  if (!isValid) {
    return null;
  }
  
  return user;
}