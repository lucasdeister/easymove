import { Modal, Button } from 'react-bootstrap';
import ContentModalViagens from '../ContentModal/ContentModalViagens/ContentModalViagens';
import { useModalContext } from '../../context/ModalContext';
import Botao from '../Botao/Botao';
import ContentModalSelecaoMotorista from '../ContentModal/ContentModalSelecaoMotorista/ContentModalSelecaoMotorista';
import ContentModalInfoMotorista from '../ContentModal/ContentModalInfoMotorista/ContentModalInfoMotorista';


interface CustomModalProps {
  nome_modal: string;
  show: boolean;
  handleClose: () => void;
}

function CustomModal({ nome_modal, show, handleClose }: CustomModalProps) {

  const { campo_origem, setCampoOrigem, limparStates,
    campo_id, setCampoId, campo_destino, setCampoDestino,
    setModalNome, setModalState, setModalSelecaoMotorista,
    descricaoMotorista, comentarioMotorista, setIdMotoristaSelecionado,
    calcularRota, limparRota, setOriginLocation
  } = useModalContext();


  const fecharModal = (): void => {
    handleClose();
    if (nome_modal === "Confirmar viagem") {
      setModalNome("Solicitar viagem");
      setModalState(true);
      setIdMotoristaSelecionado(0);
      limparRota();
    }
    if (nome_modal === "Descrição motorista" || nome_modal === "Comentário motorista") {
      setModalNome("Confirmar viagem");
    }
    limparStates();
  }


  const validouCamposObrigatorios = (): boolean => {
    if (campo_id === 0 || campo_origem === "" || campo_destino === "") {
      return false;
    } else {
      return true;
    }
  }


  const estimarValorViagem = (): void => {

    const campos_obrigatorios_preenchidos = validouCamposObrigatorios();

    const customer_id = campo_id.toString();
    const origin = campo_origem;
    const destination = campo_destino;

    if (campos_obrigatorios_preenchidos) {

      async function obterValorViagem() {
        const url = "http://localhost:8080/ride/estimate";

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ customer_id, origin, destination }),
          });

          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }

          const data = await response.json();

          console.log(JSON.stringify(data));

          if (data) {
            setOriginLocation(
              { lat: data.origin.latitude, lng: data.origin.longitude }
            )
            setModalSelecaoMotorista(true);
            setModalNome("Confirmar viagem");
            calcularRota();
          }

        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error(error.message);
          } else {
            console.error("Erro desconhecido:", error);
          }
        }
      }
      obterValorViagem();

    } else {
      alert("Favor preencher os campos corretamente")
    }
  };


  const confirmarViagem = () => {

  }

  const renderModalContent = () => {
    switch (nome_modal) {
      case 'Solicitar viagem':
        return (
          <>
            <ContentModalViagens
              campo_origem={campo_origem}
              setCampoOrigem={setCampoOrigem}
              campo_id={campo_id}
              setCampoId={setCampoId}
              campo_destino={campo_destino}
              setCampoDestino={setCampoDestino}
            />
            <Botao handleOnClick={estimarValorViagem} texto={'Estimar'} />
          </>
        );
      case 'Confirmar viagem':
        return (
          <ContentModalSelecaoMotorista
            campo_id={campo_id}
            setCampoId={setCampoId}
          />
        );
      case 'Descrição motorista':
        return(
            <ContentModalInfoMotorista
              nome_campo='Descrição'
              conteudo={descricaoMotorista}
            />
        );
      case 'Comentário motorista':
        return(
          <ContentModalInfoMotorista
            nome_campo='Comentário'
            conteudo={comentarioMotorista}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal centered show={show} onHide={fecharModal}>
      <Modal.Header closeButton>
        <Modal.Title>{nome_modal}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderModalContent()}</Modal.Body>
      <Modal.Footer>
        {nome_modal === 'Confirmar viagem' && (
          <>
            <Button variant="secondary" onClick={fecharModal}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={confirmarViagem}>
              Confirmar
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;