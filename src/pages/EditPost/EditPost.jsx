import styles from './EditPost.module.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

function EditPost() {

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
                        Atualizando...
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
