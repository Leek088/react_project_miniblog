import styles from './About.module.css';
import { Link } from 'react-router-dom';

function About() {
    return (
        <div className={styles.about}>
            <div className="card text-center">
                <div className="card-header">
                    Sobre o Mini <span>Blog</span>
                </div>
                <div className="card-body">
                    <h5 className="card-title">React + Firebase</h5>
                    <p className="card-text">
                        Este projeto consiste em um blog feito com React no front-end e firebase no back-end.
                    </p>
                    <p>Fique a vontade para postar sobre todos os seus interesses</p>
                    <Link to="/login" className="btn btn-primary">Criar Post</Link>
                </div>
                <div className="card-footer text-muted">
                    Desenvolvido por <Link target="_blank" to="https://github.com/Leek088">@Leek088</Link>
                </div>
            </div>
        </div>
    );
}

export default About;
