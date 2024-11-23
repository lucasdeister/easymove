import TextArea from "../../Campo/TextArea/TextArea";

interface ContentModalInfoMotoristaProps{
  nome_campo: string;
  conteudo: string;
}

function ContentModalInfoMotorista( { conteudo, nome_campo }: ContentModalInfoMotoristaProps) {

  return (
    <form>
        <TextArea nome={nome_campo} value={conteudo}/>
    </form>
  );
}

export default ContentModalInfoMotorista;
