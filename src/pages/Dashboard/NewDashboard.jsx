import { Link } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

function NewDashboard() {
    //Recupera o usuário logado
    const user = useAuthValue();

    //Armazena o id do usuário do banco firebase
    const uid = user.uid;

    //Recupera os posts realcionado a esse id de usuário
    //Recupera o estado de carregamento da consulta
    //Recupera erros que possam ocorrer na consutla aos posts
    const { documents: posts, loading, error } = useFetchDocuments("posts", null, uid);

    //Recupera a função de deletar o post do usuário
    const { deleteDocument, response } = useDeleteDocument("posts");

    //Aguarda a consulta ao banco antes de carregar a página
    if (loading || response.loading) {
        return <p>Carregando...</p>
    }

    return (
        <div className="mt-10">
            {
                posts && posts.length === 0
                    ? //Se não houver posts
                    (
                        <div>
                            <p>Não foram encontrados posts</p>
                            <Link to="/posts/create" className="btn">
                                Criar primeiro post
                            </Link>
                        </div>
                    )
                    : //Se houver posts
                    (
                        <div className="mt-3">
                            <h3>Edite seus posts</h3>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Título</th>
                                        <th scope="col">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        posts && posts.map(
                                            (post, index) => (
                                                <tr key={index}>
                                                    <td>{post.title}</td>
                                                    <td>
                                                        <div className="btn-group" role="group">
                                                            <Link to={`/post/${post.id}`} type="button" className="btn btn-success text-white">Ver</Link>
                                                            <Link to={`/post/edit/${post.id}`} type="button" className="btn btn-warning">Editar</Link>
                                                            <button onClick={() => deleteDocument(post.id)} type="button" className="btn btn-danger text-white">Excluir</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
            }
            <div>
                {error && <p>{error}</p>}
                {response.error && <p>{response.error}</p>}
            </div>
        </div>
    );
}

export default NewDashboard;
