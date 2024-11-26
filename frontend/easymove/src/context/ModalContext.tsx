import { createContext, useState, useContext, ReactNode, useRef } from "react";
import Motorista from "../components/types/IMotorista";

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
  idMotoristaSelecionado: number;
  originRef: React.MutableRefObject<HTMLInputElement | null>;
  destinationRef: React.MutableRefObject<HTMLInputElement | null>;
  directionsResponse: any;
  distance: string;
  duration: string;
  originLocation: Location;
  motoristas: Motorista[];
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
  setIdMotoristaSelecionado: (id_motorista: number) => void;
  calcularRota: () => void;
  limparRota: () => void;
  setDistance: (distancia: string) => void;
  setDuration: (duracao: string) => void;
  setOriginLocation: (location: Location) => void;
  setDirectionsResponse: (resposta: any) => void;
  setMotoristas: (motoristas: Motorista[]) => void;
}

interface Location{
  lat: number;
  lng: number;
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
  const [idMotoristaSelecionado, setIdMotoristaSelecionado] = useState<number>(0);

  const [directionsResponse, setDirectionsResponse] = useState<any | null>(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [originLocation, setOriginLocation] = useState<Location>({ lat: 0, lng: 0 });

  const [motoristas, setMotoristas] = useState<Motorista[]>([]);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef<HTMLInputElement>(null);
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef<HTMLInputElement>(null);

  const limparStates = (): void => {
    setCampoOrigem("");
    setCampoId(1);
    setCampoDestino("");
  };

  function limparRota() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");

    if (originRef.current) {
      originRef.current.value = "";
    }

    if (destinationRef.current) {
      destinationRef.current.value = "";
    }
  }

  async function calcularRota() {
  
    const DirectionsService = new google.maps.DirectionsService();

    if (!originRef.current || !destinationRef.current) {
      return;
    }
  
    try {
      const results = await DirectionsService.route({
        origin: originRef.current.value, 
        destination: destinationRef.current.value,
        travelMode: google.maps.TravelMode.DRIVING,
      });
  
      setDirectionsResponse(results);
  
      // const rota = [
      //   { origin: origem, destination: destino }
      // ];
  
      // localStorage.setItem("rota", JSON.stringify(rota));

      // console.log(JSON.stringify(directionsResponse));
  
    } catch (error) {
      console.error("Erro ao calcular rota:", error);
    }
  }


  return (
    <ModalContext.Provider value={{
      modalState, setModalState, limparStates, modalNome, setModalNome,
      campo_origem, setCampoOrigem, campo_id, setCampoId, campo_destino,
      setCampoDestino, modalSelecaoMotorista, setModalSelecaoMotorista,
      modalDescricao, setModalDescricao, descricaoMotorista, setDescricaoMotorista,
      comentarioMotorista, setComentarioMotorista, idMotoristaSelecionado,
      setIdMotoristaSelecionado, originRef, destinationRef, calcularRota, limparRota,
      directionsResponse, distance, duration, setDistance, setDuration, originLocation,
      setOriginLocation, setDirectionsResponse, motoristas, setMotoristas
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
