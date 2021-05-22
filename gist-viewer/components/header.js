import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSpring, animated } from 'react-spring';

import styles from './header.module.css';

export default function Header( ) {
    const [isMenuOpen, setIsMenuOpen] = useState(false),
        router = useRouter(),
        menuTransition = useSpring({
            transform: isMenuOpen ? 'translate3d(0,0,0)' : 'translate3d(-350px,0,0)',
        });

    return (
        <>
            <header className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.leftColumn}>
                        <animated.div
                            className={styles.menuContainer}
                            style={menuTransition}
                        >
                            <div className={styles.menuIconContainer}>
                                <img
                                    className={styles.menuIcon}
                                    src="../../image/menu_open.svg"
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                    }}
                                    alt="menu opened"
                                />
                            </div>
                            <div className={styles.menuItemsContainer}>
                                <div>
                                    <Link href="/">
                                        <a
                                            className={
                                                router.pathname === '/' ? styles.currentPage : null
                                            }
                                        >
                                            Home
                                        </a>
                                    </Link>
                                </div>
                                <div>
                                    <Link href="/viewFavorites">
                                        <a
                                            className={
                                                router.pathname === '/viewFavorites'
                                                    ? styles.currentPage
                                                    : null
                                            }
                                        >
                                            View Favorites
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </animated.div>
                        <img
                            className={`${styles.menuIcon} ${isMenuOpen ? styles.hide : null
                            }`}
                            src="../../image/menu.svg"
                            onClick={() => {
                                setIsMenuOpen(true);
                            }}
                            alt="menu closed"
                        />
                    </div>
                    <div className={styles.siteTitle}>
                        Public Gist Viewer
                    </div>
                    <div className={styles.rightColumn}>

                    </div>
                </div>
            </header>
        </>
    );
}
