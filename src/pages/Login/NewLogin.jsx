import styles from "./NewLogin.module.css";
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

function NewLogin() {
    //Inputs do formulário
    const [inputs, setInputs] = useState(
        {
            email: '',
            password: ''
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

        if (!inputs.email) {
            newErrors.push('O email é obrigatório.');
        }
        else if (!validarEmail(inputs.email)) {
            newErrors.push('O email está em um formato errado');
        }

        if (!inputs.password) {
            newErrors.push('A senha é obrigatória.');
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    // Verifica o formato do e-mail
    const validarEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    //Recupera a função de logar,
    //Recupera erros caso ocorra no ato do login
    //Recupera o estado de carregamento do login
    const { login, error: authError, loading } = useAuthentication();

    //Evento de envio do formulário para o login
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateInputs()) {
            var user = {
                email: inputs.email,
                password: inputs.password,
            };

            await login(user);
        }
    };

    //Toda vez que o erro de login ocorre,
    //armazena na lista de erros
    useEffect(() => {
        if (authError) {
            const newErrors = [];
            newErrors.push(authError);
            setErrors(newErrors);
        }
    }, [authError])

    return (
        <div className={styles.container_login}>
            <section className="vh-10">
                <div className="container py-5 h-100">
                    <div className="col-12">
                        <div className="card shadow-2-strong">
                            <div className="pt-5 pb-5 text-center">
                                <h3 className="mb-5">Entrar</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group text-left">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="E-mail do usuário"
                                            value={inputs.email}
                                            onChange={handleInputChange}
                                            className="form-control form-control" />
                                    </div>
                                    <div className="form-group text-left">
                                        <label>Senha</label>
                                        <input
                                            type="password"
                                            name="password"
                                            autoComplete="off"
                                            required
                                            placeholder="Insira a senha"
                                            value={inputs.password}
                                            onChange={handleInputChange}
                                            className="form-control" />
                                    </div>
                                    {!loading ? (
                                        <button className="btn btn-primary btn-lg btn-block">Login</button>
                                    ) : (
                                        <button disabled className="btn btn-warning btn-lg btn-block">Carregando...</button>
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
                </div>
            </section>
        </div>
    );
}

export default NewLogin;
