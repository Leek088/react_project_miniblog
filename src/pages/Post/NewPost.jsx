import styles from "./NewPost.module.css";
import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';

function NewPost() {

    //Recupera o parametro passado pela URL
    const { id } = useParams();

    //Com base no parametro e na "tabela\documento"
    //recupera o post, o estado de carregamento e
    //em caso de erros, os erros.
    const { document: post, loading, error } = useFetchDocument("posts", id);

    return (
        <div className={styles.card_post}>
            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && post && (
                <div className="card mb-3">
                    <img src={post.image} className="img-thumbnail mx-auto d-block card-img-top" alt={post.image} />
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text text-justify">{post.body}</p>
                        <p className="card-text">
                            <small className="text-muted">
                                {
                                    post && post.tags.map((tag, index) => (
                                        <span key={index} className="text-muted">
                                            #{tag}&nbsp;
                                        </span>
                                    ))
                                }
                            </small>
                        </p>
                        <p>@{post.createdBy}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NewPost;
