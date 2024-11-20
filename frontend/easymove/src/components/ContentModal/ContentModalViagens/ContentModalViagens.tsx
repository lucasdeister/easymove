import Campo from "../../Campo/Campo";

interface ContentModalTarefasProps {
  campo_origem: string;
  campo_origem_disabled: boolean;
  setCampoOrigem: (campo_origem: string) => void;
}

function ContentModalTarefas({
  campo_origem,
  setCampoOrigem,
  campo_origem_disabled }: ContentModalTarefasProps) {

  return (
    <form>
      <Campo nome={"Origem"} tipo={"text"} value={campo_origem} disabled={campo_origem_disabled}
        onChange={(e) => setCampoOrigem(e.target.value)} />
      {/* <Campo nome={"Destino"} tipo={"text"} value={campo_nome} disabled={campo_nome_disabled}
        onChange={(e) => setCampoNome(e.target.value)} /> */}
    </form>
  );
}

export default ContentModalTarefas;
