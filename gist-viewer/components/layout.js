import Head from 'next/head';
import styles from './layout.module.css';

import Header from '../components/header';
import Footer from '../components/footer';

export default function Layout({ children, pageTitle, itemsInCart }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Wilbert Cedeño's Portfolio - {pageTitle}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta name="robots" content="noarchive" />
            </Head>
            <Header itemsInCart={itemsInCart} />
            <main className={styles.main}>{children}</main>
            <Footer />
        </div>
    );
}
