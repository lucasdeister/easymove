import { useModalContext } from "../../context/ModalContext";

interface BotaoPrincipalProps {
    texto: string;
    classe: string;
    handleShow: () => void;
  }
  
function BotaoPrincipal({ texto, classe, handleShow }: BotaoPrincipalProps) {

    const { setModalNome, limparStates } = useModalContext();

    const exibirModalCriacao = () => {
        if(handleShow) {
            handleShow();
        }
        limparStates();
        setModalNome("Solicitar");
    }

    const handleOnClick = (): void =>{
        exibirModalCriacao();
    } 

    return(
        <>
            <button 
                className={`btn btn-outline-${classe}
                btn-lg me-3 mb-3 text-dark`}
                onClick={handleOnClick}>{texto}
            </button>
        </>
    )
}


export default BotaoPrincipal;