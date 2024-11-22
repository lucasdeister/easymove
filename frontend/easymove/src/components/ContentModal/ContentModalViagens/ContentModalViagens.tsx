import Campo from "../../Campo/Campo";

interface ContentModalViagensProps {
  campo_origem: string;
  campo_origem_disabled: boolean;
  setCampoOrigem: (campo_origem: string) => void;
  campo_id: number;
  campo_id_disabled: boolean;
  setCampoId: (campo_id: number) => void;
  campo_destino: string;
  campo_destino_disabled: boolean;
  setCampoDestino: (campo_destino: string) => void;
}

function ContentModalViagens({
  campo_origem,
  setCampoOrigem,
  campo_origem_disabled,
  campo_id,
  campo_id_disabled,
  setCampoId,
  campo_destino,
  setCampoDestino,
  campo_destino_disabled,
}: ContentModalViagensProps) {

  return (
    <form>
      <Campo nome={"Id"} tipo={"number"} value={campo_id.toString()} disabled={campo_id_disabled}
        onChange={(e) => setCampoId(parseInt(e.target.value))} />
      <Campo nome={"Origem"} tipo={"text"} value={campo_origem} disabled={campo_origem_disabled}
        onChange={(e) => setCampoOrigem(e.target.value)} />
      <Campo nome={"Destino"} tipo={"text"} value={campo_destino} disabled={campo_destino_disabled}
        onChange={(e) => setCampoDestino(e.target.value)} />
    </form>
  );
}

export default ContentModalViagens;
