import { createContext, useState, useContext, ReactNode } from "react";

interface ModalContextProps {
  modalState: boolean;
  modalNome: string;
  campo_origem: string;
  campo_id: number;
  campo_destino: string;
  modalSelecaoMotorista: boolean;
  modalDescricao: boolean;
  descricaoMotorista: string;
  comentarioMotorista: string;
  setCampoOrigem: (campo_origem: string) => void;
  setCampoId: (campo_id: number) => void;
  setCampoDestino: (campo_destino: string) => void;
  setModalState: (state: boolean) => void;
  setModalNome: (state: string) => void;
  limparStates: () => void;
  setModalSelecaoMotorista: (modalSelecaoMotorista: boolean) => void;
  setModalDescricao: (modalDescricao: boolean) => void;
  setDescricaoMotorista: (descricaoMotorista: string) => void;
  setComentarioMotorista: (comentarioMotorista: string) => void;
}

// Criando o contexto com tipo adequado
export const ModalContext = createContext<ModalContextProps | undefined>(undefined);

// Definindo as props para o ModalProvider
interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalNome, setModalNome] = useState<string>("");
  const [modalState, setModalState] = useState<boolean>(false);
  const [modalSelecaoMotorista, setModalSelecaoMotorista] = useState<boolean>(false);
  const [modalDescricao, setModalDescricao] = useState<boolean>(false);


  const [campo_origem, setCampoOrigem] = useState<string>('');
  const [campo_id, setCampoId] = useState<number>(1);
  const [campo_destino, setCampoDestino] = useState<string>('');
  const [descricaoMotorista, setDescricaoMotorista] = useState<string>('');
  const [comentarioMotorista, setComentarioMotorista] = useState<string>('');

  const limparStates = (): void => {
    setCampoOrigem("");
    setCampoId(1);
    setCampoDestino("");
  };


  return (
    <ModalContext.Provider value={{
       modalState, setModalState, limparStates, modalNome, setModalNome,
       campo_origem, setCampoOrigem, campo_id, setCampoId, campo_destino,
       setCampoDestino, modalSelecaoMotorista, setModalSelecaoMotorista,
       modalDescricao, setModalDescricao, descricaoMotorista, setDescricaoMotorista,
       comentarioMotorista, setComentarioMotorista
       }}>
        {children}
    </ModalContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext deve ser usado dentro de um ModalProvider");
  }
  return context;
};
