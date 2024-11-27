import styles from "./ContentModalSelecaoMotorista.module.scss"

import Table from "../../Table/Table";
import { useEffect, useState } from "react";
import Motorista from "../../types/IMotorista";
import ActionSelecionar from "../../Table/Action/ActionSelecionar/ActionSelecionar";
import { useModalContext } from "../../../context/ModalContext";
import { useJsApiLoader, GoogleMap, Marker,DirectionsRenderer, Libraries } from "@react-google-maps/api"

interface ContentModalSelecaoMotoristaProps {
  motoristas: Motorista[];
}

const ContentModalSelecaoMotorista = ({ motoristas }: ContentModalSelecaoMotoristaProps) => {

  const { setModalNome, setDescricaoMotorista,
    setModalDescricao, setComentarioMotorista,
    directionsResponse, distance, duration, originLocation
   } = useModalContext();

  if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
    throw new Error("A chave da API do Google Maps não foi definida.");
  }

  const libraries: Libraries = ['places'];

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: libraries,
  });

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
    setDescricaoMotorista(motorista.description);
    setModalDescricao(true);
  }


  const exibirModalComentario = (motorista: Motorista) => {
    setModalNome("Comentário motorista");
    setComentarioMotorista(motorista.review.comment);
    setModalDescricao(true);
  }

  const renderRow = (motorista: Motorista) => (
    <>
      <td>{motorista.name}</td>
      {!isMobile &&
        <td>
          <a href="#" onClick={() => exibirModalDescricao(motorista)}>Descrição</a>
        </td>}
      {!isMobile && <td>{motorista.vehicle}</td>}
      <td>
        <a href="#" onClick={() => exibirModalComentario(motorista)}>{motorista.review.rating}/5</a>
      </td>
      <td>R$ {motorista.value.toFixed(2).replace(".", ",")}</td>
      <td>
        <ActionSelecionar id={motorista.id}/>
        {/* aqui */}
      </td>
    </>
  );

  return (
    <form>
      <div className={styles.container_mapa}>
        {isLoaded ? (
          <GoogleMap
            center={originLocation}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
          >
            <Marker position={originLocation}/>
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse}/>
            )}
          </GoogleMap>
        ) : (
          <div>Carregando mapa...</div>
        )}
        <div className={styles.container_infos}>
          <p className="me-1">Distância: {distance}</p>
          <p className="me-1">Duração: {duration}</p>
        </div>
      </div>
      <Table
        columns={isMobile ? columnsMobile : columnsDesktop}
        data={motoristas} renderRow={renderRow} />
    </form>
  )
}

export default ContentModalSelecaoMotorista
