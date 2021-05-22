import {useEffect, useState} from "react";
import Link from 'next/link';

import {setStateViaAPI} from "../library/graphQLHelper";
import Layout from "../components/layout";
import styles from '../styles/index.module.css';
import common from '../styles/common.module.css';

const Index = () => {
    const [gistsByUser, setGistsByUser] = useState({gists: [], isFetching: false}),
        [gistById, setGistById] = useState({gist: {url: ''}, isFetching: false}),
        [favoriteGists, setFavoriteGists] = useState({gists: [], isFetching: false}),
        [username, setUsername] = useState(''),
        [isLoading, setIsLoading] = useState(false),
        [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitDisabled(true);
        setIsLoading(true);
        // console.log('gistsByUser State', gistsByUser)
        await setStateViaAPI(gistsByUser, setGistsByUser, 'gists',
            `{ gists(username: "${username}") { url, description, created_at, id } }`, 'gists')
        setIsLoading(false);

        // try {
        //     const contentType = 'application/json',
        //         res = await fetch('/api/saveInterest', {
        //             method: 'POST',
        //             headers: {
        //                 Accept: contentType,
        //                 'Content-Type': contentType,
        //             },
        //         });
        //
        //     if (res.ok) {
        //         const {data} = await res.json();
        //         setIsLoading(false);
        //         alert(data);
        //     } else {
        //         throw new Error(res.status);
        //     }
        // } catch (error) {
        //     console.error('Failed to add interest.');
        //     console.log(error);
        // }
    };

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
        // fetchGists()
        // fetchGistById()
        // fetchAllFavoriteGists()
    }, []);

    return (
        <Layout pageTitle="Home">
            <div>
                <form id={'add-interest'} onSubmit={handleSubmit} className={styles.form}>
                    <span className={styles.formLabel}>Username:</span>
                    <input
                        className={styles.usernameInput}
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => {
                            const username = e.target.value
                            setUsername(username);
                            (username) ? setIsSubmitDisabled(false) : setIsSubmitDisabled(true)
                        }}
                    />
                    <button
                        disabled={isSubmitDisabled}
                        type="submit"
                        className={
                            isSubmitDisabled ? common.disabledButton : common.button
                        }
                    >
                        {isLoading
                            ? `Please Wait...`
                            : isSubmitDisabled
                                ? `No username!`
                                : `Search`} &#129488;
                    </button>
                </form>
                {console.log('gistsByUser', gistsByUser)}
                <div>
                    {!gistsByUser.gists.length ? 'Please search first.' : null}
                    {!gistsByUser.isFetching ? gistsByUser.gists.map(({id, description, created_at, url}, i) => (
                        <div className={common.gistCard}>
                            <Link href={`/gist/${id}`}>
                                <a>
                                    <div key={`id${i}`} className={common.fieldTitle}><span
                                        className={common.fieldLabel}>ID:</span> {id}</div>
                                </a>
                            </Link>
                            <div key={`description${i}`} className={common.fieldRows}><span
                                className={common.fieldLabel}>Description:</span> {description ? description : 'None'}
                            </div>
                            <div key={`created_at${i}`} className={common.fieldRows}><span
                                className={common.fieldLabel}>Date Created:</span> {created_at}
                            </div>
                            <div key={`url${i}`} className={common.fieldRows}><span
                                className={common.fieldLabel}>Url:</span> <a href={url} target="_blank">Link to Gist</a>
                            </div>
                        </div>
                    )) : 'Loading...'}
                </div>
            </div>

            {/*{console.log('gistById', gistById)}*/}
            {/*<div>*/}
            {/*    <h1>Fetching gist by gist ID via API (GraphQL)</h1>*/}
            {/*    {!gistById.isFetching ? <div>{gistById.gist.url}</div> : 'Loading...'}*/}
            {/*</div>*/}

            {/*{console.log('favoriteGists', favoriteGists)}*/}
            {/*<div>*/}
            {/*    <h1>Fetching all favorite gists via API (GraphQL)</h1>*/}
            {/*    {!favoriteGists.isFetching ? favoriteGists.gists.map((gist, i) => (*/}
            {/*        <div key={i}>{gist.gistId}</div>*/}
            {/*    )) : 'Loading...'}*/}
            {/*</div>*/}
        </Layout>
    )
}

export default Index