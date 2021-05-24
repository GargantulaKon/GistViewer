import Head from 'next/head';
import styles from './layout.module.css';

import Header from '../components/header';
import Footer from '../components/footer';
import common from "../styles/common.module.css";

export default function Layout({children, pageTitle, isLoading}) {

    return (
        <div className={styles.container}>
            <Head>
                <title>Wilbert Cedeño's Portfolio - {pageTitle}</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="viewport" content="width=device-width,initial-scale=1"/>
                <meta name="robots" content="noarchive"/>
            </Head>
            <Header/>
            <main className={styles.main}>
                {isLoading ?
                    <div className={common.loadingScreen}>
                        <div className={common.loadingText}>Loading...</div>
                    </div>
                    : null}
                {children}</main>
            <Footer/>
        </div>
    );
}
