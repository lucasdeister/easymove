import styles from "./Header.module.scss";

function Header(){
    return(
        <header className={styles.container_header}>
            <h1>EasyMove</h1>
        </header>
    )
}

export default Header;
