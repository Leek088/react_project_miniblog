import { NavLink, useNavigate } from "react-router-dom";
import { useAuthentication } from '../../hooks/useAuthentication';
import { useAuthValue } from '../../context/AuthContext';
import { useState } from 'react';

function NewNavbar() {
    const user = useAuthValue();
    const { logout } = useAuthentication();

    const [query, setQuery] = useState("");
    const navigate = useNavigate();

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
                                    <li className="nav-item">
                                        <button className="btn text-danger" onClick={logout}>Sair</button>
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
                <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0">
                    <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="btn btn-outline-light my-2 my-sm-0"
                        type="submit">Search
                    </button>
                </form>
            </div>
        </nav>

    );
}

export default NewNavbar;
