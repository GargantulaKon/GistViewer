import {useEffect, useState} from "react";

import {setStateViaAPI} from "../library/graphQLHelper";

const Index = () => {
    const [gistsByUser, setGistsByUser] = useState({gists: [], isFetching: false}),
        [gistById, setGistById] = useState({gist: { url: ''}, isFetching: false}),
        [favoriteGists, setFavoriteGists] = useState({gists: [], isFetching: false})

    useEffect(() => {
        const fetchGists = async () => {
                await setStateViaAPI(gistsByUser, setGistsByUser, 'gists',
                    '{ gists(username: "akutuzov") { url } }', 'gists')
            },
            fetchGistById = async () => {
                await setStateViaAPI(gistById, setGistById, 'gist',
                    '{ gist(id: "98d3a64c2c93c685a7406178d8badb0b") { url } }', 'gist')
            },
            fetchAllFavoriteGists = async () => {
                await setStateViaAPI(favoriteGists, setFavoriteGists, 'gists',
                    '{ getAllFavoriteGists { gistId } }', 'getAllFavoriteGists')
            }
        fetchGists()
        fetchGistById()
        fetchAllFavoriteGists()
    }, []);

    return (
        <>
            {console.log('gistsByUser', gistsByUser)}
            <div>
                <h1>Fetching gists by user via API (GraphQL)</h1>
                {!gistsByUser.isFetching ? gistsByUser.gists.map((gist, i) => (
                    <div key={i}>{gist.url}</div>
                )) : 'Loading...'}
            </div>

            {console.log('gistById', gistById)}
            <div>
                <h1>Fetching gist by gist ID via API (GraphQL)</h1>
                {!gistById.isFetching ? <div>{gistById.gist.url}</div> : 'Loading...'}
            </div>

            {console.log('favoriteGists', favoriteGists)}
            <div>
                <h1>Fetching all favorite gists via API (GraphQL)</h1>
                {!favoriteGists.isFetching ? favoriteGists.gists.map((gist, i) => (
                    <div key={i}>{gist.gistId}</div>
                )) : 'Loading...'}
            </div>
        </>
    )
}

export default Index