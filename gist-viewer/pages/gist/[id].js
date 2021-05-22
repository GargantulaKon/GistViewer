import Layout from "../../components/layout";
import common from '../../styles/common.module.css';
import {useEffect, useState} from "react";
import {setStateViaAPI} from "../../library/graphQLHelper";
import {useRouter} from 'next/router'

const ViewGist = () => {
    const router = useRouter(),
        {id} = router.query,
        [gist, setGist] = useState({gist: {url: ''}, isFetching: false})

    useEffect(async () => {
        if (!id) {
            return;
        }
        const fetchGist = async () => {
            // console.log('id', id)
            await setStateViaAPI(gist, setGist, 'gist',
                `{ gist(id: "${id}") { files } }`, 'gist')
        }
        await fetchGist()
    }, [id]);

    return (
        <Layout pageTitle="View Gist)">
            <div className={common.card}>
                <div className={common.mainInfo}>
                    <h1>View Gist</h1>
                    {gist.gist.files ? console.log('Object.keys(gist.gist.files)', Object.keys(gist.gist.files)) : null}
                    <>{!gist.isFetching ?
                        gist.gist.files ?
                            Object.keys(gist.gist.files).map((key) => (
                                <div className={common.gistCard}>
                                    <div key={`id${gist.gist.files[key].filename}`} className={common.fieldTitle}><span
                                        className={common.fieldLabel}>Filename:</span> {gist.gist.files[key].filename}
                                    </div>
                                    <div key={`description${gist.gist.files[key].filename}`}
                                         className={common.fieldRows}><span
                                        className={common.fieldLabel}>Type:</span> {gist.gist.files[key].type}
                                    </div>
                                    <div key={`created_at${gist.gist.files[key].filename}`}
                                         className={common.fieldRows}><span
                                        className={common.fieldLabel}>Language:</span> {gist.gist.files[key].language ? gist.gist.files[key].language : 'None'}
                                    </div>
                                    <div key={`created_at${gist.gist.files[key].filename}`}
                                         className={common.fieldRows}><span
                                        className={common.fieldLabel}>Size:</span> {gist.gist.files[key].size} bytes
                                    </div>
                                    <div key={`url${gist.gist.files[key].filename}`} className={common.fieldRows}><span
                                        className={common.fieldLabel}>Url:</span> <a href={gist.gist.files[key].raw_url}
                                                                                     target="_blank">Link to File</a>
                                    </div>
                                </div>
                            )) : null
                        : 'Loading...'}</>
                </div>
            </div>
        </Layout>
    )
}

export default ViewGist