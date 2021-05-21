import useSWR from 'swr'
import {useEffect, useState} from "react";

import {getGistsByUser} from "../library/githubAPI";

const fetcher = async (query) => {
    let fetchCall = await fetch('/api/graphql', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({query}),
        }),
        json = await fetchCall.json()
    return await json.data
}


export default function Index() {
    const {data, error} = useSWR('{ gists(username: "akutuzov") { url } }', fetcher),
        [gistsByUser, setGistsByUser] = useState({gists: [], isFetching: false});

    useEffect(() => {
        const fetchGists = async () => {
            try {
                setGistsByUser({gists: gistsByUser.gists, isFetching: true});
                const response = await getGistsByUser('dansteen');
                // console.log(response);
                setGistsByUser({gists: response, isFetching: false});
            } catch (e) {
                console.log(e);
                setGistsByUser({gists: gistsByUser.gists, isFetching: false});
            }
        };
        fetchGists();
    }, []);

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    const {gists} = data

    return (
        <>
            <div>
                <h1>Fetching via API (GraphQL)</h1>
                {gists.map((gist, i) => (
                    <div key={i}>{gist.url}</div>
                ))}
            </div>
            <div>
                <h1>Fetching via library</h1>
                {!gistsByUser.isFetching ? gistsByUser.gists.map((gist, i) => (
                    <div key={i}>{gist.url}</div>
                )) : 'Loading...'}
            </div>
        </>
    )
}