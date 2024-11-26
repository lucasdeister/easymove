export default interface Motorista {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review:{
      rating: number;
      comment: string;
    };
    value: number;
  }