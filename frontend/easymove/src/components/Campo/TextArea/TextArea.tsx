interface TextAreaProps {
  nome: string;
  value: string;
}

function TextArea({ nome, value }: TextAreaProps) {
  return (
    <div className="mt-3">
      <label 
        htmlFor='descricao'
        className="form-label">{nome}
      </label>
      <textarea
        id='descricao'
        className="form-control"
        value={value}
        rows={3}
        disabled
      />
    </div>
  );
}

export default TextArea;
