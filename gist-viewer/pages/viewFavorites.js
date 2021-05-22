import Layout from "../components/layout";
import common from '../styles/common.module.css';

const ViewFavorites = () => {
    return (
        <Layout pageTitle="View Favorites)">
            <div className={common.card}>
                <div className={common.mainInfo}>
                    <h1> View Favorites </h1>
                </div>
            </div>
        </Layout>
    )
}

export default ViewFavorites