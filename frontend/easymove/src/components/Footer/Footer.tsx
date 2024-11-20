import style from "./Footer.module.scss"

function Footer() {
  return (
    <footer className={`${style.container_rodape}`}>
      <span className={style.descricao}>Design by - Lucas Deister</span>
      <a href="https://www.instagram.com/lucasdeister7/" target="_blank" rel="noreferrer">
        <i id={style.instagram} className={`${style.icones} bi bi-instagram`}></i>
      </a>
      <a href="mailto:lucasdeister7@hotmail.com" target="_blank" rel="noreferrer">
        <i id={style.email} className={`${style.icones} bi bi-envelope`}></i>
      </a>
    </footer>
  );
}

export default Footer;