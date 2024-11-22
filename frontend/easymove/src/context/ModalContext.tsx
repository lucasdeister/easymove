import { createContext, useState, useContext, ReactNode } from "react";

interface ModalContextProps {
  modalState: boolean;
  modalNome: string;
  campo_origem: string;
  campo_origem_disabled: boolean;
  campo_id: number;
  campo_id_disabled: boolean;
  campo_destino: string;
  campo_destino_disabled: boolean;
  modalSelecaoMotorista: boolean;
  setCampoOrigem: (campo_origem: string) => void;
  setCampoId: (campo_id: number) => void;
  setCampoDestino: (campo_destino: string) => void;
  setModalState: (state: boolean) => void;
  setModalNome: (state: string) => void;
  limparStates: () => void;
  setCampoOrigemDisabled: (campo_origem_disabled: boolean) => void;
  setCampoIdDisabled: (campo_id_disabled: boolean) => void;
  setCampoDestinoDisabled: (campo_destino_disabled: boolean) => void;
  habilitarCamposForm: () => void;
  setModalSelecaoMotorista: (modalSelecaoMotorista: boolean) => void;
}

// Criando o contexto com tipo adequado
export const ModalContext = createContext<ModalContextProps | undefined>(undefined);

// Definindo as props para o ModalProvider
interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const [modalSelecaoMotorista, setModalSelecaoMotorista] = useState<boolean>(false);
  const [modalNome, setModalNome] = useState<string>("");

  const [campo_origem, setCampoOrigem] = useState<string>('');
  const [campo_id, setCampoId] = useState<number>(0);
  const [campo_destino, setCampoDestino] = useState<string>('');

  const [campo_origem_disabled, setCampoOrigemDisabled] = useState<boolean>(false);
  const [campo_id_disabled, setCampoIdDisabled] = useState<boolean>(false);
  const [campo_destino_disabled, setCampoDestinoDisabled] = useState<boolean>(false);


  const habilitarCamposForm = (): void => {
    setCampoOrigemDisabled(false);
    setCampoIdDisabled(false);
    setCampoDestinoDisabled(false);
  }

  const limparStates = (): void => {
    setCampoOrigem("");
    setCampoId(0);
    setCampoDestino("");
  };


  return (
    <ModalContext.Provider value={{
       modalState, setModalState, limparStates, modalNome, setModalNome, habilitarCamposForm,
       campo_origem, setCampoOrigem, campo_origem_disabled, setCampoOrigemDisabled,
       campo_id, setCampoId, campo_id_disabled, setCampoIdDisabled,
       campo_destino, setCampoDestino, campo_destino_disabled, setCampoDestinoDisabled,
       modalSelecaoMotorista, setModalSelecaoMotorista
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
