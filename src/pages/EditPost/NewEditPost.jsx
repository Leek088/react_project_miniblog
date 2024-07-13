import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

function NewEditPost() {

    //Inputs do formulário
    const [inputs, setInputs] = useState(
        {
            title: '',
            image: '',
            body: '',
            tags: []
        }
    );

    //Armazena os dados do usuário
    const user = useAuthValue();
    //Armazena o id passado pela url
    const { id } = useParams();
    //Recupera os dados do post, relacionado ao id
    const { document: post, loading } = useFetchDocument("posts", id);
    //Recupera a função responsável por atualizar o post
    const { updateDocument, response } = useUpdateDocument("posts");
    //Utilizado para redirecionar à dashboard
    const navigate = useNavigate();
    //Utilizado para armazenar os erros do formulário
    const [errors, setErrors] = useState([]);

    //No carregamento, insere os valores do bando nos inputs
    useEffect(() => {
        setInputs({
            title: post?.title || '',
            image: post?.image || '',
            body: post?.body || '',
            tags: post?.tags || []
        });
    }, [post]);

    //armazena o valor do input que está sendo modificado.
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
    };

    //Verifica se os inputs estão preenchidos corretamente, 
    //caso contrário, armazena os erros em uma lista.
    const validateInputs = () => {
        const newErrors = [];

        if (!inputs.title) {
            newErrors.push('O titulo é obrigatório.');
        }

        if (!inputs.image) {
            newErrors.push('A Url da imagem é obrigatório.');
        }
        else {
            try {
                new URL(inputs.image)
            } catch (error) {
                newErrors.push('A Url da imagem é invalida.');
            }
        }

        if (!inputs.body) {
            newErrors.push('O conteúdo é obrigatório.');
        }

        if (!inputs.tags) {
            newErrors.push('As tags são obrigatórias.');
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    //Trata a string das tags, gerando um array
    const transformarStringEmArray = (valor) => {
        if (typeof valor === 'string') {
            const arrayResultado = valor.split(',').map(tag => tag.trim().toLowerCase());
            const arrayFiltrado = arrayResultado.filter(item => item.trim() !== '');
            return arrayFiltrado;
        } else {
            return valor;
        }
    };

    //Impede a atualização do post se houver erros, 
    //caso contrario, atualiza e redireciona para "Dashboard"
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateInputs()) {
            const data =
            {
                title: inputs.title,
                image: inputs.image,
                body: inputs.body,
                tags: transformarStringEmArray(inputs.tags),
                uid: user.uid,
                createdBy: user.displayName
            };

            await updateDocument(id, data);

            navigate("/dashboard");
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <section className="vh-10">
                <div className="container py-2 h-100">
                    <div className="card shadow-2-strong">
                        <div className="pt-5 pb-5 text-center">
                            <h3 className="mb-5">Crie seu post!</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="text-left">
                                        <span>Título:</span>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="title"
                                            required
                                            placeholder="Pense num bom título"
                                            value={inputs.title}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label className="text-left">
                                        <span>URL da imagem:</span>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="image"
                                            required
                                            placeholder="Insira a URL da imagem"
                                            value={inputs.image}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label className="text-left">
                                        <span>Preview da imagem atual</span>
                                        <img className="mx-auto d-block img-thumbnail" src={post?.image} alt={post?.title} />
                                    </label>
                                </div>
                                <label className="text-left">
                                    <span>Conteúdo:</span>
                                    <textarea
                                        className="form-control"
                                        name="body"
                                        required
                                        placeholder="Insira o conteúdo do post"
                                        value={inputs.body}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </label>
                                <div className="form-group">
                                    <label className="text-left">
                                        <span>Tags:</span>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="tags"
                                            required
                                            placeholder="Insira as tags, separadas por vírgula"
                                            value={inputs.tags}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                </div>
                                {!response.loading ? (
                                    <button className="btn btn-primary">Atualizar Post</button>
                                ) : (
                                    <button disabled className="btn btn-warning">Carregando...</button>
                                )}
                                {response.error && <p className="error">{response.error}</p>}
                                {errors.length > 0 && (
                                    <div>
                                        <h2>Erros:</h2>
                                        <ul className="error">
                                            {errors.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default NewEditPost;
