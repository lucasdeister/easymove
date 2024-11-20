import style from "./Main.module.scss"

import BotaoPrincipal from "../BotaoPrincipal/BotaoPrincipal";
import CustomModal from "../CustomModal/CustomModal";
import { useModalContext } from "../../context/ModalContext";

function Main() {

  const { modalState, setModalState, modalNome } = useModalContext();

  return (
    <main className={style.container_main}>
      <hr className="m-5" />
      <div className={style.container_botoes_principais}>
        <BotaoPrincipal texto="Solicitar" classe="success" handleShow={() => setModalState(true)} />
      </div>
      <CustomModal
        nome_modal={modalNome + " Viagem"}
        // atualizarGrid={recuperarDados}
        handleClose={() => setModalState(false)}
        show={modalState} />
    </main >
  )
}

export default Main;