import prisma from "../../library/prisma"

async function prismaFetcher(func) {
    try {
        return await func()
    } catch (error) {
        console.error(error)
    } finally {
        console.log('disconnecting from DB')
        await prisma.$disconnect()
    }
}

export function getAllFavoriteGists() {
    return prismaFetcher(() => prisma.gist.findMany())
}

export async function setFavoriteGist(gistId) {
    return prismaFetcher(() => prisma.gist.create({
        data: {
            gistId
        }
    }))
}

export async function removeFavoriteGist(gistId) {
    return prismaFetcher(() => prisma.gist.delete({
        where: {
            gistId,
        },
    }))
}
