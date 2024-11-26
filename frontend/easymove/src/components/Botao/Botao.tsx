import styles from "./Botao.module.scss"

interface BotaoProps {
    handleOnClick: () => void;
    texto: string;
}

function Botao({ handleOnClick, texto }: BotaoProps) {

    return (
        <div className={styles.container_botao}>
            <button type="submit" className={styles.botao} onClick={handleOnClick}>{texto}</button>
        </div>
    )
}

export default Botao;