import styles from "./ContentModalSelecaoMotorista.module.scss"

import Table from "../../Table/Table";
import { useEffect, useState } from "react";
import Motorista from "../../types/IMotorista";
import Action from "../../Table/Action/Action";
import { useModalContext } from "../../../context/ModalContext";

interface ContentModalSelecaoMotoristaProps {
  campo_id: number;
  setCampoId: (campo_id: number) => void;
}

const ContentModalSelecaoMotorista = ({}: ContentModalSelecaoMotoristaProps) => {

  const { setModalNome, setDescricaoMotorista, setModalDescricao, setComentarioMotorista } = useModalContext();

  const motoristas = [
    {
      id: 1,
      nome: "Homer Simpson",
      descricao: "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
      carro: "Plymouth Valiant 1973 rosa e enferrujado",
      rating: "2/5",
      comment: "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
      taxa_km: 2.5,
      km_minimo: 1,
    },
    {
      id: 2,
      nome: "Dominic Toretto",
      descricao: "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
      carro: "Dodge Charger R/T 1970 modificado",
      rating: "4/5",
      comment: "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
      taxa_km: 5.0,
      km_minimo: 5,
    },
    {
      id: 3,
      nome: "James Bond",
      descricao: "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
      carro: "Aston Martin DB5 clássico",
      rating: "5/5",
      comment: "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
      taxa_km: 10.0,
      km_minimo: 10,
    },
  ];

  const columnsDesktop = ["Nome", "Descrição", "Veículo", "Avaliação", "Valor", "Seleção"];
  const columnsMobile = ["Nome", "Avaliação", "Valor", "Seleção"];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const exibirModalDescricao = (motorista: Motorista) => {
    setModalNome("Descrição motorista");
    setDescricaoMotorista(motorista.descricao);
    setModalDescricao(true);
  }

  
  const exibirModalComentario = (motorista: Motorista) => {
    setModalNome("Comentário motorista");
    setComentarioMotorista(motorista.comment);
    setModalDescricao(true);
  }

  const renderRow = (motorista: Motorista) => (
    <>
      <td>{motorista.nome}</td>
      {!isMobile &&
        <td>
          <a href="#" onClick={() => exibirModalDescricao(motorista)}>Descrição</a>
        </td>}
      {!isMobile && <td>{motorista.carro}</td>}
      <td>
        <a href="#" onClick={() => exibirModalComentario(motorista)}>{motorista.rating}</a>
        </td>
      <td>{motorista.taxa_km}</td>
      <td>
        <Action id={motorista.id}/>
      </td>
    </>
  );


  return (
    <form>
      <div className={styles.container_mapa}>
      </div>
      <Table
        columns={isMobile ? columnsMobile : columnsDesktop}
        data={motoristas} renderRow={renderRow} />
    </form>
  )
}

export default ContentModalSelecaoMotorista
