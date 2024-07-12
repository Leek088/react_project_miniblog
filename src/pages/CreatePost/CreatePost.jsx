import styles from './CreatePost.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';

function CreatePost() {
    const [inputs, setInputs] = useState(
        {
            title: '',
            image: '',
            body: '',
            tags: []
        }
    );

    const [errors, setErrors] = useState([]);

    const user = useAuthValue();
    const { insertDocument, response } = useInsertDocument("posts");
    const navigate = useNavigate();

    //atualiza o valor do input correspondente.
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
    };

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
    //caso contrario redireciona para "Home"
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
        <div className={styles.create_post}>
            <h2>Criar Post</h2>
            <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Título:</span>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="Pense num bom título"
                        value={inputs.title}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    <span>URL da imagem:</span>
                    <input
                        type="text"
                        name="image"
                        required
                        placeholder="Insira a URL da imagem"
                        value={inputs.image}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    <span>Conteúdo:</span>
                    <textarea
                        name="body"
                        required
                        placeholder="Insira o conteúdo do post"
                        value={inputs.body}
                        onChange={handleInputChange}
                    ></textarea>
                </label>
                <label>
                    <span>Tags:</span>
                    <input
                        type="text"
                        name="tags"
                        required
                        placeholder="Insira as tags, separadas por vírgula"
                        value={inputs.tag}
                        onChange={handleInputChange}
                    />
                </label>
                {!response.loading ? (
                    <button className="btn">Criar</button>
                ) : (
                    <button className="btn" disabled>
                        Carregando...
                    </button>
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
    );
}

export default CreatePost;
