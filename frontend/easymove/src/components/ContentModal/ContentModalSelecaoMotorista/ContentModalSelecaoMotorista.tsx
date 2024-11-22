// import styles from "./ContentModalSelecaoMotorista.scss"

import Campo from "../../Campo/Campo";

interface ContentModalSelecaoMotoristaProps {
    campo_id: number;
    campo_id_disabled: boolean;
    setCampoId: (campo_id: number) => void;
  }

const ContentModalSelecaoMotorista = ({
    campo_id,
    campo_id_disabled,
    setCampoId,
}: ContentModalSelecaoMotoristaProps) => {

  return (
    <form>
      <Campo nome={"Id"} tipo={"number"} value={campo_id.toString()} disabled={campo_id_disabled}
        onChange={(e) => setCampoId(parseInt(e.target.value))} />
    </form>
  )
}

export default ContentModalSelecaoMotorista
