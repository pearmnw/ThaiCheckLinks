import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// วิธีเพื่อกัน error ที่พบบ่อย
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient(
    {
        log: ['query', 'info', 'warn'],
    }
)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export const db = prisma;