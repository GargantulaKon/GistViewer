import Layout from "../../components/layout"
import common from '../../styles/common.module.css'
import {useEffect, useState} from "react"
import {setStateViaAPI} from "../../library/graphQLHelper"
import {useRouter} from 'next/router'

const ViewGist = () => {
    const router = useRouter(),
        {id} = router.query,
        [gist, setGist] = useState({gist: {url: ''}, isFetching: false}),
        [isLoading, setIsLoading] = useState(false)

    useEffect(async () => {
        if (!id) {
            return
        }
        setIsLoading(true)
        const fetchGist = async () => {
            await setStateViaAPI(gist, setGist, 'gist',
                `{ gist(id: "${id}") { files } }`, 'gist')
        }
        await fetchGist()
        setIsLoading(false)
    }, [id])

    return (
        <Layout pageTitle="View Gist)" isLoading={isLoading}>
            <div className={common.card}>
                <div className={common.mainInfo}>
                    <h1 className={common.pageTitle}>Gist Files</h1>
                </div>
            </div>
            <>{!gist.isFetching ?
                gist.gist.files ?
                    Object.keys(gist.gist.files).map((key) => (
                        <div key={`card${gist.gist.files[key].filename}`} className={common.gistCard}>
                            <div className={common.fieldTitle}><span
                                className={common.fieldLabel}>Filename:</span> {gist.gist.files[key].filename}
                            </div>
                            <div
                                className={common.fieldRows}><span
                                className={common.fieldLabel}>Type:</span> {gist.gist.files[key].type}
                            </div>
                            <div
                                className={common.fieldRows}><span
                                className={common.fieldLabel}>Language:</span> {gist.gist.files[key].language ? gist.gist.files[key].language : 'None'}
                            </div>
                            <div
                                className={common.fieldRows}><span
                                className={common.fieldLabel}>Size:</span> {gist.gist.files[key].size} bytes
                            </div>
                            <div className={common.fieldRows}><span
                                className={common.fieldLabel}>Url:</span> <a href={gist.gist.files[key].raw_url}
                                                                             target="_blank">Link to File</a>
                            </div>
                        </div>
                    )) : null
                : null}</>
        </Layout>
    )
}

export default ViewGist