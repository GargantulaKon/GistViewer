import prisma from "../../library/prisma";

export async function getAllFavoriteGists() {
    return await prisma.gist.findMany()
}

export async function setFavoriteGist(gistId) {
    return await prisma.gist.create({
        data: {
            gistId
        }
    })
}

export async function removeFavoriteGist(gistId) {
    return await prisma.gist.delete({
        where: {
            gistId,
        },
    })
}
