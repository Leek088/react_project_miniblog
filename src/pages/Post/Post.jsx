import styles from './Post.module.css';
import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';

function Post() {
    const { id } = useParams();
    const { document: post, loading, error } = useFetchDocument("posts", id);

    return (
        <div className={styles.post_container}>
            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && post && (
                <div>
                    <h1>{post.title}</h1>
                    <img src={post.image} alt={post.title} />
                    <p>{post.body}</p>
                    <h3>Post relacionado à:</h3>
                    <div className={styles.tags}>
                        {
                            post.tags.map((tag, index) => (
                                <p key={index}><span>#</span>{tag}</p>
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

export default Post;
