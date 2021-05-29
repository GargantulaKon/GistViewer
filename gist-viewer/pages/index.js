import {useEffect, useState} from "react"
import Link from 'next/link'

import {addOrRemoveFavorite, setStateViaAPI} from "../library/graphQLHelper"
import Layout from "../components/layout"
import styles from '../styles/index.module.css'
import common from '../styles/common.module.css'
import {format, utcToZonedTime} from "date-fns-tz"

const Index = () => {
    const [gistsByUser, setGistsByUser] = useState({gists: [], isFetching: false}),
        [favoriteGistsFetch, setFavoriteGistsFetch] = useState({gists: [], isFetching: false}),
        [username, setUsername] = useState(''),
        [isLoading, setIsLoading] = useState(false),
        [isSubmitDisabled, setIsSubmitDisabled] = useState(true),
        [favorites, setFavorites] = useState([])

    useEffect(async () => {
        try {
            const fetchAllFavoriteGists = async () => {
                await setStateViaAPI(favoriteGistsFetch, setFavoriteGistsFetch, 'gists',
                    '{ getAllFavoriteGists { gistId } }', 'getAllFavoriteGists')
            }
            await fetchAllFavoriteGists()
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        if (!favoriteGistsFetch.gists) {
            return
        }
        let convertedList = []
        favoriteGistsFetch.gists.forEach((gist) => {
            convertedList.push(gist.gistId)
        })

        setFavorites(convertedList)
    }, [favoriteGistsFetch])

    const handleSubmit = async (event) => {
            event.preventDefault()
            setIsSubmitDisabled(true)
            setIsLoading(true)

            await setStateViaAPI(gistsByUser, setGistsByUser, 'gists',
                `{ gists(username: "${username}") { url, description, created_at, id } }`, 'gists')
            setIsLoading(false)
            setIsSubmitDisabled(false)
        },
        addFavorite = async (event, id, query) => {
            event.preventDefault()
            setIsLoading(true)
            try {
                let result = await addOrRemoveFavorite(query)

                if (result.setFavoriteGist.gistId) {
                    setIsLoading(false)
                    setFavorites([...favorites, id])
                }
            } catch (error) {
                console.error(error)
            }
        },
        removeFavorite = async (event, id, query) => {
            event.preventDefault()
            setIsLoading(true)
            try {
                let result = await addOrRemoveFavorite(query)

                if (result.removeFavoriteGist.gistId) {
                    setIsLoading(false)
                    setFavorites(favorites.filter((favorite) => favorite !== id))
                }
            } catch (error) {
                console.error(error)
            }
        }

    return (
        <Layout pageTitle="Home" isLoading={isLoading}>
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
                <div>
                    {!gistsByUser.gists.length ? 'Please search first.' : null}
                    {!gistsByUser.isFetching ? gistsByUser.gists.map(({id, description, created_at, url}, i) => (
                        <div key={id} className={common.gistCard}>
                            <div className={styles.starAndIdWrapper}>
                                {favorites.includes(id) ?
                                    <a onClick={(event) => removeFavorite(event, id, `mutation { removeFavoriteGist(id: "${id}") { gistId } }`)}><img
                                        alt="full star" title="Remove Favorite" src="image/star_full.png"/>
                                    </a>
                                    :
                                    <a onClick={(event) => addFavorite(event, id, `mutation { setFavoriteGist(id: "${id}") { gistId } }`)}>
                                        <img alt="empty star" title="Mark Favorite"
                                             src="image/star_empty.png"/>
                                    </a>
                                }
                                <Link href={`/gist/${id}`}>
                                    <a>
                                        <div key={`id${i}`} className={common.fieldTitle}><span
                                            className={common.fieldLabel}>ID:</span> {id}</div>
                                    </a>
                                </Link>
                            </div>
                            <div key={`description${i}`} className={common.fieldRows}><span
                                className={common.fieldLabel}>Description:</span> {description ? description : 'None'}
                            </div>
                            <div key={`created_at${i}`} className={common.fieldRows}><span
                                className={common.fieldLabel}>Date Created:</span> {format(utcToZonedTime(created_at, 'America/New_York'), "M-dd-yyyy, h:mm:ss a (z) O")}
                            </div>
                            <div key={`url${i}`} className={common.fieldRows}><span
                                className={common.fieldLabel}>Url:</span> <a href={url} target="_blank">Link to Gist</a>
                            </div>
                        </div>
                    )) : null}
                </div>
            </div>
        </Layout>
    )
}

export default Index