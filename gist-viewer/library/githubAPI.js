async function runFetch(url) {
    try {
        let fetchCall = await fetch(url, {
            headers: new Headers({
                // "Authorization": "token insert PAT from Db if needed (got to https://github.com/settings/tokens)"
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