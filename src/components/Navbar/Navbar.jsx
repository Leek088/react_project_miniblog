import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <NavLink className={styles.brand} to="/">
                Mini <span>Blog</span>
            </NavLink>
            <ul className={styles.link_list}>
                <li><NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/">Home</NavLink></li>
                <li><NavLink className={({ isActive }) => (isActive ? styles.active : "")} to="/about">Sobre</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;