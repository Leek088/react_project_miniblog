import styles from './EditPost.module.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useFetchDocument } from '../../hooks/useFetchDocument';

function EditPost() {
    const [inputs, setInputs] = useState(
        {
            title: '',
            image: '',
            body: '',
            tags: []
        }
    );

    const user = useAuthValue();
    const { id } = useParams();
    const { document: post, loading } = useFetchDocument("posts", id);
    const { insertDocument, response } = useInsertDocument("posts");
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setInputs({
            title: post?.title || '',
            image: post?.image || '',
            body: post?.body || '',
            tags: post?.tags || []
        });
    }, [post]);

    //atualiza o valor do input correspondente.
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
    };


    //verifica se os inputs estão preenchidos corretamente 
    //e armazena os erros em uma lista.
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
                tags: inputs.tags.split(",").map(tag => tag.trim().toLowerCase()),
                uid: user.uid,
                createdBy: user.displayName
            });

            navigate("/");
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div className={styles.edit_post}>
            <h2>Editar Post</h2>
            <p>Atualize o post abaixo!</p>
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
                <p className={styles.preview_title}>Preview da imagem atual:</p>
                <img className={styles.image_preview} src={post?.image} alt={post?.title} />
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
                        value={inputs.tags}
                        onChange={handleInputChange}
                    />
                </label>
                {!response.loading ? (
                    <button className="btn">Atualizar</button>
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

export default EditPost;
