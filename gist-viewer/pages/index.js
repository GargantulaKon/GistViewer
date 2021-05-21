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
    // const {data, error} = callGraphQLQuery('{ gists(username: "akutuzov") { url } }'),

    const [gistsByUser, setGistsByUser] = useState({gists: [], isFetching: false}),
        [gistById, setGistById] = useState({gist: {}, isFetching: false}),
        [gistsByUserViaLibrary, setGistsByUserViaLibrary] = useState({gists: [], isFetching: false})
    // graphQLQuery = fetcher('{ gists(username: "akutuzov") { url } }')

    useEffect(() => {
        const fetchGists = async () => {
                try {
                    setGistsByUser({gists: gistsByUser.gists, isFetching: true});
                    const response = await fetcher('{ gists(username: "akutuzov") { url } }');
                    setGistsByUser({gists: response.gists, isFetching: false})
                } catch (e) {
                    console.log(e);
                    setGistsByUser({gists: gistsByUser.gists, isFetching: false});
                }
            },
            fetchGistById = async () => {
                try {
                    setGistById({gist: gistById.gist, isFetching: true});
                    const response = await fetcher('{ gist(id: "98d3a64c2c93c685a7406178d8badb0b") { url } }');
                    console.log('response', response)
                    setGistById({gist: response.gist, isFetching: false})
                } catch (e) {
                    console.log(e);
                    setGistById({gist: gistById.gist, isFetching: false});
                }
            },
            fetchGistsViaLibrary = async () => {
                try {
                    setGistsByUserViaLibrary({gists: gistsByUserViaLibrary.gists, isFetching: true});
                    const response = await getGistsByUser('dansteen');
                    setGistsByUserViaLibrary({gists: response, isFetching: false});
                } catch (e) {
                    console.log(e);
                    setGistsByUserViaLibrary({gists: gistsByUserViaLibrary.gists, isFetching: false});
                }
            };
        // fetchGists();
        fetchGistById();
        // fetchGistsViaLibrary();
    }, []);

    // if (error) return <div>Failed to load</div>
    // if (!data) return <div>Loading...</div>

    // const {gists} = data

    return (
        <>
            {/*{console.log('gistsByUser', gistsByUser)}*/}
            {/*<div>*/}
            {/*    <h1>Fetching gists by user via API (GraphQL)</h1>*/}
            {/*    {!gistsByUser.isFetching ? gistsByUser.gists.map((gist, i) => (*/}
            {/*        <div key={i}>{gist.url}</div>*/}
            {/*    )) : 'Loading...'}*/}
            {/*</div>*/}
            {console.log('gistById', gistById)}
            <div>
                <h1>Fetching gist by gist ID via API (GraphQL)</h1>
                {!gistById.isFetching ? <div>{gistById.gist.url}</div> : 'Loading...'}
            </div>
            {/*{console.log('gistsByUserViaLibrary', gistsByUserViaLibrary)}*/}
            {/*<div>*/}
            {/*    <h1>Fetching via library</h1>*/}
            {/*    {!gistsByUserViaLibrary.isFetching ? gistsByUserViaLibrary.gists.map((gist, i) => (*/}
            {/*        <div key={i}>{gist.url}</div>*/}
            {/*    )) : 'Loading...'}*/}
            {/*</div>*/}
        </>
    )
}