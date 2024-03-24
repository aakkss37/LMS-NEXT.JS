import {PrismaClient} from '@prisma/client'

/**
 * Expose a global `prisma` instance for use by the application.
 *
 * If `globalThis.prisma` is already defined, this module exports that instance.
 * Otherwise, it creates a new instance of PrismaClient and assigns it to
 * `globalThis.prisma`.
 *
 * This allows the Prisma client to be shared across the application without
 * having to pass it around everywhere.
 */
declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma ||  new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;