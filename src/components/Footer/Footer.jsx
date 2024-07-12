import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="card">
                <div className="card-body">
                    <blockquote className="mb-0">
                        <p>Escreva sobre o que você tem interesse!</p>
                        <footer className="blockquote-footer">
                            Mini Blog &copy; 2022
                            <p>
                                Desenvolvido por &nbsp;
                                <Link target="_blank" to="https://github.com/Leek088">Leek088</Link>
                            </p>
                        </footer>
                    </blockquote>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
