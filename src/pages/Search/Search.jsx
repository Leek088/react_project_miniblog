import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import useQuery from "../../hooks/useQuery";
import NewPostDetail from "../../components/PostDetail/NewPostDetail";
import { Link } from "react-router-dom";

function Search() {
    //Armazena as querys da url
    const query = useQuery();

    //Recupera o valor da query "q"
    const search = query.get("q");

    //Recupera os posts filtrados pela query
    //Recupera o estado de loading
    //Recupera possíveis erros na busca
    const { documents: posts, loading, error } = useFetchDocuments("posts", search);

    return (
        <div>
            <div className="card-group card-columns">
                {loading && <p>Carregando...</p>}
                {
                    /*Se houver posts pelo resultado da query*/
                    !loading && posts && posts.map(
                        (post, index) => <NewPostDetail key={index} post={post} />
                    )
                }
                {error && <p>{error}</p>}
            </div>
            {
                /*Se não tiver encontrado resultado*/
                posts && posts.length === 0 && (
                    <div className="text-center">
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>Desculpe!</strong> Infelizmente não temos posts com a tag #{search}.
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <Link className="btn btn-info" to="/">Voltar</Link>
                    </div>
                )
            }
        </div>
    );
}

export default Search;
