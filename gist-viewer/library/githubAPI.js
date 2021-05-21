// export function getGistsByUser(username) {
//     return fetch(`https://api.github.com/users/${username}/gists`)
//         .then(res => res.json())
//         .then(json => json.data)
// }
export async function getGistsByUser(username) {
    try {
        let fetchCall = await fetch(`https://api.github.com/users/${username}/gists`)
        return await fetchCall.json()
    } catch (error) {
        console.error(error)
    }
}

export async function getGistById(id) {
    try {
        let fetchCall = await fetch(`https://api.github.com/gists/${id}`)
        return await fetchCall.json()
    } catch (error) {
        console.error(error)
    }
}