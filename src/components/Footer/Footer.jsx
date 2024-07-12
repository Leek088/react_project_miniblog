import styles from "./Footer.module.css";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="card">
                <div className="card-body">
                    <blockquote className="mb-0">
                        <p>Escreva sobre o que você tem interesse!</p>
                        <footer className="blockquote-footer">Mini Blog &copy; 2022</footer>
                    </blockquote>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
