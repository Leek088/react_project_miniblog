import { Link } from 'react-router-dom';
function NewPostDetail({ post }) {
    return (
        <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
                <img width="200px" src={post.image} alt={post.title}></img>
                <div className="card-body">
                    <p className="card-text">
                        {post.title}
                    </p>
                    <div
                        className="d-flex justify-content-between align-items-center"
                    >
                        {
                            post && post.tags.map((tag, index) => (
                                <p key={index}>
                                    <span>#</span>
                                    {tag}
                                </p>
                            ))
                        }
                        <div className="btn-group">
                            <Link to={`/post/${post.id}`} className="btn btn-sm btn-outline-secondary">
                                Ler
                            </Link>
                        </div>
                        <small className="text-muted">{post.createdBy}</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewPostDetail;
