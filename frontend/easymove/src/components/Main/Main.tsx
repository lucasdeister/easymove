import style from "./Main.module.scss"

import BotaoPrincipal from "../BotaoPrincipal/BotaoPrincipal";
import CustomModal from "../CustomModal/CustomModal";
import Table from "../Table/Table";
import { useModalContext } from "../../context/ModalContext";
import HistoricoViagens from "../types/IHistoricoViagens";
import { useEffect, useState } from "react";

function Main() {

  const { modalState, setModalState, modalNome,
    modalSelecaoMotorista, setModalSelecaoMotorista,
    modalDescricao, setModalDescricao, campo_id_filtro,
    setCampoIdFiltro, motorista_id_filtro, setMotoristaIdFiltro,
    setHistoricoViagens, historico_viagens } = useModalContext();

  const columnsDesktop = ["Data e hora", "Nome", "Origem", "Destino", "Distância",
    "Tempo decorrido", "Valor"];
  const columnsMobile = ["Data e hora", "Origem", "Destino"];
  
  const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 768);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleFiltro = (): void => {

      async function filtrarResultados(id_customer: number, driver_id?: number) {
          let url = `http://localhost:8080/ride/${id_customer}`;

          if (driver_id && driver_id > 0) {
              url += `?driver_id=${driver_id}`;
          }
          try {
            const response = await fetch(url, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
  
            if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
            }
  
            const data = await response.json();
  
            if (data) {
              setHistoricoViagens(data.rides);
            }
          } catch (error: unknown) {
            if (error instanceof Error) {
              console.error(error.message);
            } else {
              console.error("Erro desconhecido:", error);
            }
          }
        }
        filtrarResultados(campo_id_filtro, motorista_id_filtro);
      };

      function formatarData(dataIso: string): string {
        const data = new Date(dataIso);
    
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
        const ano = data.getFullYear();
    
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
        const segundos = String(data.getSeconds()).padStart(2, '0');
    
        return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
    }
  
  const renderRow = (historico: HistoricoViagens) => (
    <>
      <td>{formatarData(historico.date)}</td>
      {!isMobile && <td>{historico.driver.name}</td>}
      <td>{historico.origin}</td>
      <td>{historico.destination}</td>
      {!isMobile && <td>{historico.distance} Km</td>}
      <td>{historico.duration}</td>
      <td>R$ {historico.value.toFixed(2).replace(".", ",")}</td>
    </>
  );

  return (
    <main className={style.container_main}>
      <div className={style.container_botoes_principais}>
        <BotaoPrincipal texto="Solicitar" classe="primary" handleShow={() => setModalState(true)} />
      </div>
      <hr className="ms-5 me-5" />
      <CustomModal
        nome_modal={modalNome}
        handleClose={() => setModalState(false)}
        show={modalState} />
      <CustomModal
        nome_modal={modalNome}
        handleClose={() => setModalSelecaoMotorista(false)}
        show={modalSelecaoMotorista} />
      <CustomModal
        nome_modal={modalNome}
        handleClose={() => setModalDescricao(false)}
        show={modalDescricao} />
      <div className={style.container_filtro}>
           <input
            id="Id usuário"
            className="form-control"
            type="number"
            value={campo_id_filtro.toString()}
            placeholder={"Id usuário"}
            onChange={(e) => setCampoIdFiltro(parseInt(e.target.value))}
            required
            min={"1"}/>
        <div className="dropdown">
          <a className="btn btn-outline-primary dropdown-toggle" href="#" role="button"
             data-bs-toggle="dropdown" aria-expanded="false">Motorista
          </a>
          <ul className="dropdown-menu">
          <li>
              <a className="dropdown-item" href="#" onClick={() => setMotoristaIdFiltro(0)}>Todos</a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={() => setMotoristaIdFiltro(1)}>01 - Homer Simpson</a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={() => setMotoristaIdFiltro(2)}>02 - Dominic Toretto</a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={() => setMotoristaIdFiltro(3)}>03 - James Bond</a>
            </li>
          </ul>
        </div>
        <span>Motorista id: {motorista_id_filtro}</span>
        <button 
          type="button"
          className="btn btn-outline-primary"
          onClick={handleFiltro}>Filtrar</button>
      </div>
      <div className={style.container_tabela_main}>
        <Table columns={isMobile ? columnsMobile : columnsDesktop}
               data={historico_viagens} renderRow={renderRow} />
      </div>
    </main >
  )
}

export default Main;