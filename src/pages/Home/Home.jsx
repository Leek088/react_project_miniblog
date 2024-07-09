﻿import styles from './Home.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

//Components
import PostDetail from '../../components/PostDetail/PostDetail';

function Home() {
    const [query, setQuery] = useState("");
    const { documents: posts, loading, error } = useFetchDocuments("posts");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (query) {
            return navigate(`/search?q=${query}`)
        }
    };

    return (
        <div className={styles.home}>
            <h1>Veja os nossos posts mais recentes</h1>
            <form onSubmit={handleSubmit} className={styles.search_form}>
                <input
                    type="text"
                    placeholder="Ou busque por tags..."
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-dark">Pesquisar</button>
            </form>
            <div>
                {loading && <p>Carregando...</p>}
                {
                    !loading && posts && posts.map(
                        (post, index) => <PostDetail key={index} post={post} />
                    )
                }
                {
                    posts && posts.length === 0 && (
                        <div className={styles.noposts}>
                            <p>Não foram encontrados posts</p>
                            <Link className="btn" to="posts/create">Criar primeiro post</Link>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Home;