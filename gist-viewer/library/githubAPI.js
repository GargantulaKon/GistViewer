async function runFetch(url) {
    try {
        let fetchCall = await fetch(url, {
            headers: new Headers({
                // "Authorization": `Basic ${base64.encode(`GargantulaKon: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}`)}`
                "Authorization": "token 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"
            }),
        })
        return await fetchCall.json()
    } catch (error) {
        console.error('api error',  error)
    }
}

export function getGistsByUser(username) {
    return runFetch(`https://api.github.com/users/${username}/gists`)
}

export function getGistById(id) {
    return runFetch(`https://api.github.com/gists/${id}`)
}