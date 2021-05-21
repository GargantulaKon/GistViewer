export async function getAllFavoriteGists() {
    const feed = await prisma.gist.findMany()
    console.log('feedInAPI', feed)
    return feed
}