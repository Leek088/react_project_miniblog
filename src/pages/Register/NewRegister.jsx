import styles from "./NewRegister.module.css";
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

function NewRegister() {
    //Inputs do formulário
    const [inputs, setInputs] = useState(
        {
            displayName: '',
            email: '',
            password: '',
            confirmPasswor: ''
        }
    );

    //Armazena os erros do forumlário
    const [errors, setErrors] = useState([]);

    //atualiza o valor do input que está sendo utilizado.
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
    };

    //verifica se os inputs estão preenchidos corretamente, 
    //caso contrário, armazena os erros em uma lista.
    const validateInputs = () => {
        const newErrors = [];

        if (!inputs.displayName) {
            newErrors.push('O nome é obrigatório.');
        }

        if (!inputs.email) {
            newErrors.push('O email é obrigatório.');
        }
        else if (!validarEmail(inputs.email)) {
            newErrors.push('O email está em um formato errado');
        }

        if (!inputs.password) {
            newErrors.push('A senha é obrigatória.');
        }

        if (!inputs.confirmPasswor) {
            newErrors.push('A confirmação da senha é obrigatória.');
        }

        if (inputs.confirmPasswor !== inputs.password) {
            newErrors.push('As duas senhas não são iguais.');
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    // Verifica o formato do e-mail
    const validarEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    //Recupera a função de criar usuario,
    //Recupera erros caso ocorra no ato do cadastro
    //Recupera o estado de carregamento do cadastro
    const { createUser, error: authError, loading } = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateInputs()) {
            var user = {
                displayName: inputs.displayName,
                email: inputs.email,
                password: inputs.password
            };

            await createUser(user);
        }

    };

    //Toda vez que o erro de cadastro ocorre,
    //armazena na lista de erros
    useEffect(() => {
        if (authError) {
            const newErrors = [];
            newErrors.push(authError);
            setErrors(newErrors);
        }
    }, [authError])

    return (
        <div className={styles.container_register}>
            <section className="vh-10">
                <div className="container py-2 h-100">
                    <div className="card shadow-2-strong">
                        <div className="pt-5 pb-5 text-center">
                            <h3 className="mb-5">Cadastra-se no site</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Nome do usuário
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="displayName"
                                            required
                                            placeholder="Nome do usuário"
                                            value={inputs.displayName}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>E-mail
                                        <input
                                            className="form-control"
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="E-mail do usuário"
                                            value={inputs.email}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>Password
                                        <input
                                            className="form-control"
                                            type="password"
                                            name="password"
                                            placeholder="Senha"
                                            value={inputs.password}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>Password
                                        <input
                                            className="form-control"
                                            type="password"
                                            name="confirmPasswor"
                                            placeholder="Confirme a senha"
                                            value={inputs.confirmPasswor}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                </div>
                                {!loading ? (
                                    <button className="btn btn-primary">Cadastrar</button>
                                ) : (
                                    <button disabled className="btn btn-warning">Carregando...</button>
                                )}
                                {errors.length > 0 && (
                                    <div className="mt-2 text-danger">
                                        <ul className="error">
                                            {errors && errors.map((error, index) => (
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

export default NewRegister;
