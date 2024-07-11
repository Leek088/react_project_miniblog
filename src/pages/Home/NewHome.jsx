import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

//Components
import NewPostDetail from '../../components/PostDetail/NewPostDetail';
function NewHome() {
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
        <main role="main">
            <section className="jumbotron text-center">
                <div className="container">
                    <h1>Mini Blog</h1>
                    <p className="lead text-muted">
                        Crie, compartilhe, colecione momentos e se divirta.
                    </p>
                </div>
            </section>

            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row">
                        {loading && <p>Carregando...</p>}
                        {
                            !loading && posts && posts.map(
                                (post, index) => <NewPostDetail key={index} post={post} />
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
            </div>
        </main>
    );
}

export default NewHome;
