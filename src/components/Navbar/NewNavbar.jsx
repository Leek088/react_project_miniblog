import styles from "./NewNavbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthentication } from '../../hooks/useAuthentication';
import { useAuthValue } from '../../context/AuthContext';
import { useState } from 'react';

function NewNavbar() {
    //Recupera o usuário, caso esteja logado.
    const user = useAuthValue();
    //Recupera o metodo para deslogar o usuário.
    const { logout } = useAuthentication();
    //Armazena o valor da pesguisa, para as tags
    const [query, setQuery] = useState("");
    //Usado para redirecionar à página de busca
    const navigate = useNavigate();

    //Redireciona para a página de busca,
    //enviando o parametro da pesquisa (formulário)
    const handleSubmit = (e) => {
        e.preventDefault();

        if (query) {
            return navigate(`/search?q=${query}`)
        }
    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-2 mt-1">
            <NavLink className="navbar-brand" to="/">
                Mini <span>Blog</span>
            </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <NavLink className={
                            ({ isActive }) =>
                                (isActive ? "active nav-link" : "nav-link")
                        } to="/">Home</NavLink>
                    </li>
                    {
                        user //Se usuário logado
                            ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink className={
                                            ({ isActive }) =>
                                                (isActive ? "active nav-link" : "nav-link")
                                        } to="/dashboard">Dashboard</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className={
                                            ({ isActive }) =>
                                                (isActive ? "active nav-link" : "nav-link")
                                        } to="/posts/create">Novo post</NavLink>
                                    </li>
                                </>
                            )
                            : //Se usuário desconectado
                            (
                                <>
                                    <li className="nav-item">
                                        <NavLink className={
                                            ({ isActive }) =>
                                                (isActive ? "active nav-link" : "nav-link")
                                        } to="/login">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className={
                                            ({ isActive }) =>
                                                (isActive ? "active nav-link" : "nav-link")
                                        } to="/register">Registro</NavLink>
                                    </li>
                                </>
                            )
                    }
                    <li className="nav-item">
                        <NavLink className={
                            ({ isActive }) =>
                                (isActive ? "active nav-link" : "nav-link")
                        } to="/about">Sobre</NavLink>
                    </li>
                </ul>
                {/*Formulário da pesquisa por tags*/}
                <div className={"form-inline my-2 my-lg-0"}>
                    <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Pesquisa por tag"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={handleSubmit} className="btn btn-outline-light my-2 my-sm-0"
                        type="submit">Pesquisar
                    </button>
                </div>
                {
                    user && //Se usuário logado
                    <button className="btn btn-danger ml-2" onClick={logout}>Sair</button>
                }
            </div>
        </nav>

    );
}

export default NewNavbar;
