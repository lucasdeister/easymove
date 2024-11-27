export default interface HistoricoViagens {
    id: number;
    date: string;
    nome_motorista: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    tempo: string;
    driver:{
      id: number;
      name: string;
    };
    value: number;
  }