import Campo from "../../Campo/Campo";

interface ContentModalViagensProps {
  campo_origem: string;
  setCampoOrigem: (campo_origem: string) => void;
  campo_id: number;
  setCampoId: (campo_id: number) => void;
  campo_destino: string;
  setCampoDestino: (campo_destino: string) => void;
}

function ContentModalViagens({
  campo_origem,
  setCampoOrigem,
  campo_id,
  setCampoId,
  campo_destino,
  setCampoDestino,
}: ContentModalViagensProps) {

  return (
    <form>
      <Campo nome={"Id"} tipo={"number"} value={campo_id.toString()}
        onChange={(e) => setCampoId(parseInt(e.target.value))} />
      <Campo nome={"Origem"} tipo={"text"} value={campo_origem}
        onChange={(e) => setCampoOrigem(e.target.value)} />
      <Campo nome={"Destino"} tipo={"text"} value={campo_destino}
        onChange={(e) => setCampoDestino(e.target.value)} />
    </form>
  );
}

export default ContentModalViagens;
