export async function getAllFavoriteGists() {
    const feed = await prisma.gist.findMany()
    console.log('feedInAPI', feed)
    return feed
}

export async function setFavoriteGist(gistId) {
    const feed = await prisma.gist.create({
        data: {
            gistId
        }
    })
    console.log('setFeedInAPI', feed)
    return feed
}
