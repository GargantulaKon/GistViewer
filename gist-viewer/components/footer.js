import styles from './footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerBox}>
                © {new Date().getFullYear()} Wilbert Cedeño |{' '}
                <span
                    className={styles.icon}
                    title="Running Next.js/React/NodeJS/Prisma/GraphQL/PostgreSQL"
                >{' '}
                    &#128187;
                </span>
            </div>
        </footer>
    )
}
