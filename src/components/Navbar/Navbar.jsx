import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useAuthentication } from '../../hooks/useAuthentication';
import { useAuthValue } from '../../context/AuthContext';

function Navbar() {
    const user = useAuthValue();
    
    return (
        <nav className={styles.navbar}>
            <NavLink className={styles.brand} to="/">
                Mini <span>Blog</span>
            </NavLink>
            <ul className={styles.link_list}>
                <li>
                    <NavLink className={
                        ({ isActive }) =>
                            (isActive ? styles.active : "")
                    } to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink className={
                        ({ isActive }) =>
                            (isActive ? styles.active : "")
                    } to="/about">Sobre</NavLink>
                </li>
                {
                    user //Se usuário logado
                        ? (
                            <>
                                <li>
                                    <NavLink className={
                                        ({ isActive }) =>
                                            (isActive ? styles.active : "")
                                    } to="/dashboard">Dashboard</NavLink>
                                </li>
                                <li>
                                    <NavLink className={
                                        ({ isActive }) =>
                                            (isActive ? styles.active : "")
                                    } to="/posts/create">Novo post</NavLink>
                                </li>
                            </>
                        )
                        : //Se usuário desconectado
                        (
                            <>
                                <li>
                                    <NavLink className={
                                        ({ isActive }) =>
                                            (isActive ? styles.active : "")
                                    } to="/login">Login</NavLink>
                                </li>
                                <li>
                                    <NavLink className={
                                        ({ isActive }) =>
                                            (isActive ? styles.active : "")
                                    } to="/register">Registro</NavLink>
                                </li>
                            </>
                        )
                }
            </ul>
        </nav>
    );
}

export default Navbar;