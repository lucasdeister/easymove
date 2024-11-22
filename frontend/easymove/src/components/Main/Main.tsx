import style from "./Main.module.scss"

import BotaoPrincipal from "../BotaoPrincipal/BotaoPrincipal";
import CustomModal from "../CustomModal/CustomModal";
import { useModalContext } from "../../context/ModalContext";
import { Table } from "react-bootstrap";
import Tabela from "../Table/Table";

function Main() {

  const { modalState, setModalState, modalNome,
     modalSelecaoMotorista, setModalSelecaoMotorista } = useModalContext();

     const texto_viagem = " viagem";

     const historicoViagens = [
      {
        id: 1,
        data_hora: "01/01/2024 15:00",
        nome_motorista: "Lucas",
        origem: "Guapi",
        destino: "Teresópolis",
        distancia: "10km",
        tempo: "01:00:00",
        valor: 50.70,
      },
      {
        id: 2,
        data_hora: "02/01/2024 14:00",
        nome_motorista: "Theo",
        origem: "Maceió",
        destino: "Teresópolis",
        distancia: "150km",
        tempo: "05:00:00",
        valor: 270.70,
      },
      {
        id: 3,
        data_hora: "05/01/2024 08:00",
        nome_motorista: "João",
        origem: "RJ",
        destino: "Teresópolis",
        distancia: "105km",
        tempo: "02:00:00",
        valor: 210.50,
      },
    ];
  
    const columnsDesktop = ["Data e hora", "Nome", "Origem", "Destino", "Distância",
      "Tempo decorrido", "Valor", "Avaliação"];
    const columnsMobile = ["Nome", "Origem", "Destino", "Avaliação"];

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
      {/* <Tabela columns={columns} data={historicoViagens} isMobile={isMobile} /> */}
    </main >
  )
}

export default Main;