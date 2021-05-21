// export function getGistsByUser(username) {
//     return fetch(`https://api.github.com/users/${username}/gists`)
//         .then(res => res.json())
//         .then(json => json.data)
// }

async function runFetch(url) {
    try {
        let fetchCall = await fetch(url)
        return await fetchCall.json()
    } catch (error) {
        console.error(error)
    }
}

export async function getGistsByUser(username) {
    return await runFetch(`https://api.github.com/users/${username}/gists`)
}

export async function getGistById(id) {
    return await runFetch(`https://api.github.com/gists/${id}`)
}