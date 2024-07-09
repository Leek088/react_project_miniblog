import styles from './Dashboard.module.css';
import { Link } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

function Dashboard() {
    const user = useAuthValue();
    const uid = user.uid;
    const { documents: posts, loading, error } = useFetchDocuments("posts", null, uid);

    const deleteDocument = (id) => {

    }

    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Gerencie seus posts</p>
            {
                posts && posts.length === 0
                    ? //Se não houver posts
                    (
                        <div className={styles.noposts}>
                            <Link to="/posts/create" className="btn">
                                Criar primeiro post
                            </Link>
                        </div>
                    )
                    : //Se houver posts
                    (
                        <div>
                            {
                                posts && posts.map(
                                    (post, index) => (
                                        <div key={index}>
                                            <p>{post.title}</p>
                                            <div>
                                                <Link to={`/posts/${post.id}`} className="btn btn-outline">
                                                    Ver
                                                </Link>
                                                <Link to={`posts/edit/${post.id}`} className="btn btn-outline">
                                                    Editar
                                                </Link>
                                                <button
                                                    onClick={() => deleteDocument(post.id)}
                                                    className="btn btn-outline btn-danger"
                                                >
                                                    Excluir
                                                </button>
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    )
            }
            <div>
                {error && <p>{error}</p>}
            </div>
        </div >
    );
}

export default Dashboard;
