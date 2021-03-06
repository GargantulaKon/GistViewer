import Layout from "../components/layout"
import common from '../styles/common.module.css'
import Link from "next/link"
import {useEffect, useState} from "react"
import {setStateViaAPI} from "../library/graphQLHelper"

const ViewFavorites = () => {
    const [favoriteGistsFetch, setFavoriteGistsFetch] = useState({gists: [], isFetching: false}),
        [isLoading, setIsLoading] = useState(false)

    useEffect(async () => {
        try {
            const fetchAllFavoriteGists = async () => {
                setIsLoading(true)
                await setStateViaAPI(favoriteGistsFetch, setFavoriteGistsFetch, 'gists',
                    '{ getAllFavoriteGists { gistId } }', 'getAllFavoriteGists')
            }
            await fetchAllFavoriteGists()
            setIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }, [])

    return (
        <Layout pageTitle="View Favorites)" isLoading={isLoading}>
            <div className={common.card}>
                <div className={common.mainInfo}>
                    <h1 className={common.pageTitle}> View Favorites </h1>
                </div>
            </div>
            <div>
                {!favoriteGistsFetch.isFetching && favoriteGistsFetch.gists.length ? favoriteGistsFetch.gists.map(({gistId}) => (
                    <div key={gistId} className={common.gistCard}>
                        <Link href={`/gist/${gistId}`}>
                            <a>
                                <div className={common.fieldTitle}><span
                                    className={common.fieldLabel}>ID:</span> {gistId}</div>
                            </a>
                        </Link>
                    </div>
                )) : <div className={common.gistCard}>
                    No favorites are found. Go to the home page to mark a gist as a favorite by clicking on the star
                    icon.
                </div>}
            </div>
        </Layout>
    )
}

export default ViewFavorites