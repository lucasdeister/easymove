// import styles from "./ContentModalSelecaoMotorista.scss"

import Campo from "../../Campo/Campo";

interface ContentModalSelecaoMotoristaProps {
    campo_id: number;
    setCampoId: (campo_id: number) => void;
  }

const ContentModalSelecaoMotorista = ({
    campo_id,
    setCampoId,
}: ContentModalSelecaoMotoristaProps) => {

  return (
    <form>
      <Campo nome={"Id"} tipo={"number"} value={campo_id.toString()}
        onChange={(e) => setCampoId(parseInt(e.target.value))} />
    </form>
  )
}

export default ContentModalSelecaoMotorista
