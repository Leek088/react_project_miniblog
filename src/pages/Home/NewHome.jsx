import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { Link } from "react-router-dom";

//Components
import NewPostDetail from '../../components/PostDetail/NewPostDetail';
function NewHome() {
    const { documents: posts, loading, error } = useFetchDocuments("posts");

    return (
        <main role="main">

            <div className="carousel slide">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src="https://cdn.pixabay.com/photo/2016/10/15/15/49/workshop-1742721_960_720.jpg" alt="First slide" />
                    </div>
                </div>
            </div>

            <div className="card-group mt-3">
                {loading && <p>Carregando...</p>}
                {
                    !loading && posts && posts.map(
                        (post, index) => <NewPostDetail key={index} post={post} />
                    )
                }
                {
                    posts && posts.length === 0 && (
                        <div>
                            <p>Não foram encontrados posts</p>
                            <Link className="btn" to="posts/create">Criar primeiro post</Link>
                        </div>
                    )
                }
            </div>

            {error && <p>{error}</p>}
        </main>
    );
}

export default NewHome;
