import { Link } from 'react-router-dom';
import styles from './NewPostDetail.module.css';

function NewPostDetail({ post }) {
    return (
        <div className={styles.post_detail}>
            <Link to={`/post/${post.id}`}>
                <img className="card-img-top img-fluid img-thumbnail" src={post.image} alt={post.title} />
            </Link>
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text small">@{post.createdBy}</p>
            </div>
            <div className="card-footer small">
                {
                    post && post.tags.map((tag, index) => (
                        <span key={index} className="text-muted">
                            #{tag}&nbsp;
                        </span>
                    ))
                }
            </div>
        </div>
    );
}

export default NewPostDetail;
