import {PrismaClient} from '@prisma/client'

let prisma

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    // if (!global.prisma) {
    //     global.prisma = new PrismaClient()
    // }
    // Testing to see if this can work locally to prevent the prisma is not defined error
    // when not accessing UI first before GraphQL UI
    prisma = new PrismaClient()
}

export default prisma