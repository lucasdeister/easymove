import { createContext, useState, useContext, ReactNode } from "react";

interface ModalContextProps {
  modalState: boolean;
  modalNome: string;
  campo_origem: string;
  campo_origem_disabled: boolean;
  setCampoOrigem: (campo_origem: string) => void;
  setModalState: (state: boolean) => void;
  setModalNome: (state: string) => void;
  limparStates: () => void;
  setCampoOrigemDisabled: (campo_origem_disabled: boolean) => void;
  habilitarCamposForm: () => void;
}

// Criando o contexto com tipo adequado
export const ModalContext = createContext<ModalContextProps | undefined>(undefined);

// Definindo as props para o ModalProvider
interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const [modalNome, setModalNome] = useState<string>("");

  const [campo_origem, setCampoOrigem] = useState<string>('');

  const [campo_origem_disabled, setCampoOrigemDisabled] = useState<boolean>(false);

  const habilitarCamposForm = (): void => {
    setCampoOrigemDisabled(false);
  }

  const limparStates = (): void => {
    setCampoOrigem("");
  };


  return (
    <ModalContext.Provider value={{
       modalState, setModalState, limparStates, modalNome, setModalNome,
       campo_origem, setCampoOrigem, campo_origem_disabled,
       setCampoOrigemDisabled, habilitarCamposForm}}>
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
