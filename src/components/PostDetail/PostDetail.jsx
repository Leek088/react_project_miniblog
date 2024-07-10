import styles from './PostDetail.module.css';
import { Link } from 'react-router-dom';

function PostDetail({ post }) {
    return (
        <div className={styles.post_detail}>
            <img src={post.image} alt={post.title}></img>
            <h2>{post.title}</h2>
            <p className={styles.createdby}>{post.createdBy}</p>
            <div className={styles.tags}>
                {
                   post && post.tags.map((tag, index) => (
                        <p key={index}>
                            <span>#</span>
                            {tag}
                        </p>
                    ))
                }
            </div>
            <Link to={`/post/${post.id}`} className="btn btn-outline">Ler</Link>
        </div>
    );
}

export default PostDetail;
