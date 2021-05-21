// export function getGistsByUser(username) {
//     return fetch(`https://api.github.com/users/${username}/gists`)
//         .then(res => res.json())
//         .then(json => json.data)
// }

import * as base64 from 'base-64'

async function runFetch(url) {
    try {
        let fetchCall = await fetch(url, {
            headers: new Headers({
                "Authorization": `Basic ${base64.encode(`GargantulaKon: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}`)}`
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