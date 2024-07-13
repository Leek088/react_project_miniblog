import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';

function NewCreatePost() {

    //Inputs do formulário
    const [inputs, setInputs] = useState(
        {
            title: '',
            image: '',
            body: '',
            tags: []
        }
    );

    //Armazena os erros do forumlário
    const [errors, setErrors] = useState([]);

    //Recupera o usuário, se estiver logado
    const user = useAuthValue();

    //Recupera a função de inserir posts
    //Recupera erros pelo response, caso ocorra
    const { insertDocument, response } = useInsertDocument("posts");

    //Usado para redirecionar, após o post
    const navigate = useNavigate();

    //atualiza o valor do input que está sendo alterado.
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
    };

    //Recebe do input "tags" uma string separada por virgula
    //Convert essa string em array de tags
    const transformarStringEmArray = (valor) => {
        if (typeof valor === 'string') {
            const arrayResultado = valor.split(',').map(tag => tag.trim().toLowerCase());
            const arrayFiltrado = arrayResultado.filter(item => item.trim() !== '');
            return arrayFiltrado;
        }
    };

    //verifica se os inputs estão preenchidos corretamente, 
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

    //impede o envio do formulário se houver erros, 
    //caso contrario cadastra e redireciona para "Home"
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateInputs()) {
            await insertDocument({
                title: inputs.title,
                image: inputs.image,
                body: inputs.body,
                tags: transformarStringEmArray(inputs.tags),
                uid: user.uid,
                createdBy: user.displayName
            });

            navigate("/");
        }
    };

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
                                            value={inputs.tag}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                </div>
                                {!response.loading ? (
                                    <button className="btn btn-primary">Criar Post</button>
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

export default NewCreatePost;
