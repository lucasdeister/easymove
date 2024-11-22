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

  const { campo_origem, setCampoOrigem, limparStates,
    campo_id, setCampoId, campo_destino, setCampoDestino,
    modalSelecaoMotorista, setModalNome, setModalState
  } = useModalContext();


  const fecharModal = (): void => {
    handleClose();
    if(nome_modal === "Confirmar viagem"){
      setModalNome("Solicitar");
      setModalState(true);
    }
    limparStates();
  }


  const validouCamposObrigatorios = (): boolean => {
    if(campo_id === 0 || campo_origem === "" || campo_destino === ""){
      return true;//alterar depois
    }else{
      return true;
    }
  }


  const estimarValorViagem = (): void => {

    const campos_obrigatorios_preenchidos = validouCamposObrigatorios();

    if(campos_obrigatorios_preenchidos){
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

    }else{
      alert("Favor preencher os campos corretamente")
    }



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
              campo_id={campo_id}
              setCampoId={setCampoId}
              campo_destino={campo_destino}
              setCampoDestino={setCampoDestino}
          />
          <Botao handleOnClick={estimarValorViagem} texto={"Estimar"} />
          </>
        ) : (
          <ContentModalSelecaoMotorista
           campo_id={campo_id}
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
