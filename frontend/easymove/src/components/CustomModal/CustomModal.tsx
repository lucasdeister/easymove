import { Modal, Button } from 'react-bootstrap';
import ContentModalViagens from '../ContentModal/ContentModalViagens/ContentModalViagens';
import { useModalContext } from '../../context/ModalContext';
import Botao from '../Botao/Botao';
import ContentModalSelecaoMotorista from '../ContentModal/ContentModalSelecaoMotorista/ContentModalSelecaoMotorista';

interface CustomModalProps {
  nome_modal: string;
  show: boolean;
  handleClose: () => void;
}

function CustomModal({ nome_modal, show, handleClose }: CustomModalProps) {

  const { campo_origem, setCampoOrigem, campo_origem_disabled, limparStates,
    campo_id, setCampoId, campo_id_disabled,
    campo_destino, setCampoDestino, campo_destino_disabled, modalSelecaoMotorista,
    setModalNome, setModalState
  } = useModalContext();


  const fecharModal = (): void => {
    handleClose();
    if(nome_modal === "Confirmar viagem"){
      setModalNome("Solicitar");
      setModalState(true);
    }
    limparStates();
  }

  const estimarValorViagem = (): void => {

    setModalNome("Confirmar");

    // async function obterValorViagem() {
    //   const url = "https://localhost:8080/ride/estimate";

    //   try {
    //     const response = await fetch(url, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ campo_id, campo_origem, campo_destino }),
    //     });

    //     if (!response.ok) {
    //       throw new Error(`Response status: ${response.status}`);
    //     }

    //     const valorViagem = await response.json();
    //     console.log(valorViagem); // Resultado retornado pelo backend
    //     if (valorViagem) {
    //       setModalSelecaoMotorista(true);
    //     }

    //   } catch (error: unknown) {
    //     if (error instanceof Error) {
    //       console.error(error.message);
    //     } else {
    //       console.error("Erro desconhecido:", error);
    //     }
    //   }
    // }
    // obterValorViagem();

  };


  const solicitarViagem = () => {

  }

  return (
    <>
      <Modal centered show={show} onHide={fecharModal}>
        <Modal.Header closeButton>
          <Modal.Title>{nome_modal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {nome_modal === "Solicitar viagem" ? (
          <>
          <ContentModalViagens
              campo_origem={campo_origem}
              setCampoOrigem={setCampoOrigem}
              campo_origem_disabled={campo_origem_disabled}
              campo_id={campo_id}
              setCampoId={setCampoId}
              campo_id_disabled={campo_id_disabled}
              campo_destino={campo_destino}
              setCampoDestino={setCampoDestino}
              campo_destino_disabled={campo_destino_disabled} />
          <Botao handleOnClick={estimarValorViagem} texto={"Estimar"} />
          </>
        ) : (
          <ContentModalSelecaoMotorista
           campo_id={campo_id}
           campo_id_disabled={campo_id_disabled}
           setCampoId={setCampoId}
          />
        )}
        </Modal.Body>
        <Modal.Footer>
          {modalSelecaoMotorista &&
            <>
              <Button variant="secondary" onClick={fecharModal}>Cancelar</Button>
              <Button variant="primary" onClick={solicitarViagem}>Confirmar</Button>
            </>
          }
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomModal;
