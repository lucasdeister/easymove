import React from 'react';

import styles from "./Campo.module.scss"

interface CampoProps {
  nome: string;
  tipo: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Campo({ nome, tipo, value, onChange }: CampoProps) {

  return (
    <div className={`form-group mt-3`}>
      <label htmlFor={nome.toLowerCase()} className="form-label">
        {nome}
        {nome === "Início" && <span className={styles.optional}>(Opcional)</span>}
      </label>
      <input
        id={nome.toLowerCase()}
        className="form-control" 
        type={tipo}
        value={value}
        onChange={onChange}
        required
        {...(tipo === "number" ? { min: "0" } : {})}
      />
    </div>
  );
}

export default Campo;
