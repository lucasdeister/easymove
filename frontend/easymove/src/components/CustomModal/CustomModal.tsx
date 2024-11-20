import { Modal, Button } from 'react-bootstrap';
import ContentModalViagens from '../ContentModal/ContentModalViagens/ContentModalViagens';
import { useModalContext } from '../../context/ModalContext';

interface CustomModalProps {
  nome_modal: string;
  show: boolean;
  // atualizarGrid: () => void;
  handleClose: () => void;
}

function CustomModal({ nome_modal, show, handleClose }: CustomModalProps) {

  const { campo_origem, setCampoOrigem, campo_origem_disabled, limparStates
  } = useModalContext();


  const fecharModal = (): void => {
    handleClose();
    limparStates();
  }

  const solicitarViagem = (): void => {
    console.log("asd");
  }

  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{nome_modal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ContentModalViagens 
              campo_origem={campo_origem}
              setCampoOrigem={setCampoOrigem}
              campo_origem_disabled={campo_origem_disabled}
            />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fecharModal}>Cancelar</Button>
          <Button variant="primary" onClick={solicitarViagem}>Confirmar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomModal;
