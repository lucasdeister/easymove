import style from "./Main.module.scss"

import BotaoPrincipal from "../BotaoPrincipal/BotaoPrincipal";
import CustomModal from "../CustomModal/CustomModal";
import { useModalContext } from "../../context/ModalContext";

function Main() {

  const { modalState, setModalState, modalNome,
     modalSelecaoMotorista, setModalSelecaoMotorista } = useModalContext();

     const texto_viagem = " viagem";

  return (
    <main className={style.container_main}>
      <hr className="m-5" />
      <div className={style.container_botoes_principais}>
        <BotaoPrincipal texto="Solicitar" classe="success" handleShow={() => setModalState(true)} />
      </div>
      <CustomModal
        nome_modal={modalNome + texto_viagem}
        handleClose={() => setModalState(false)}
        show={modalState} />
      <CustomModal
        nome_modal={modalNome + texto_viagem}
        handleClose={() => setModalSelecaoMotorista(false)}
        show={modalSelecaoMotorista} />
    </main >
  )
}

export default Main;