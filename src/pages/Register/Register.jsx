﻿import styles from './Register.module.css';
import { useState, useEffect } from 'react';

function Register() {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPasswor, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");

        if (password !== confirmPasswor) {
            setError("As senhas são diferentes!");
            return;
        }

        var user = {
            displayName,
            email,
            password
        };

        console.log(user);
    };

    return (
        <>
            <div className={styles.register}>
                <h1>Cadastre-se para postar</h1>
                <p>Crie seu usuário e compartilhe suas histórias</p>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Nome:</span>
                        <input
                            type="text"
                            name="displayName"
                            required
                            placeholder="Nome do usuário"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </label>
                    <label>
                        <span>E-mail:</span>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="E-mail do usuário"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        <span>Senha:</span>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Insira a senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <label>
                        <span>Confirmação de senha:</span>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            placeholder="Confirme a senha"
                            value={confirmPasswor}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </label>
                    <button className="btn">Cadastrar</button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </>
    );
}

export default Register;