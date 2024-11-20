import React from 'react';

import styles from "./Campo.module.scss"

interface CampoProps {
  nome: string;
  tipo: string;
  value: string;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Campo({ nome, tipo, value, onChange, disabled }: CampoProps) {

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
        disabled={disabled}
        {...(tipo === "number" ? { min: "0" } : {})}
      />
    </div>
  );
}

export default Campo;
