import styles from "./Search.module.css";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import useQuery from "../../hooks/useQuery";
import PostDetail from "../../components/PostDetail/PostDetail";
import { Link } from "react-router-dom";

function Search() {
    const query = useQuery();
    const search = query.get("q");
    const { documents: posts } = useFetchDocuments("posts", search);

    return (
        <div className={styles.search_container}>
            <h2>Página de search!</h2>
            <div>
                {
                    posts && posts.length === 0 && (
                        <div className={styles.noposts}>
                            <p>Não foram encontrados pots a partir da sua busca...</p>
                            <Link to="/" className="btn btn-dark">Voltar</Link>
                        </div>
                    )
                }
                {
                    posts && posts.map(
                        (post, index) => <PostDetail key={index} post={post} />
                    )
                }
            </div>
        </div>

    );
}

export default Search;
