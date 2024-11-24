import React from 'react';
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

interface CampoProps {
  nome: string;
  tipo: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Campo({ nome, tipo, value, onChange }: CampoProps) {
  if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
    throw new Error("A chave da API do Google Maps não foi definida.");
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: ['places'],
  });


  return (
    <div className="form-group mt-3">
      <label htmlFor={nome} className="form-label">{nome}</label>

      {tipo === "text" && isLoaded ? (
        <Autocomplete>
          <input
            id={nome}
            className="form-control"
            type={tipo}
            value={value}
            placeholder={nome}
            onChange={onChange}
            onBlur={onChange}
            required
          />
        </Autocomplete>
      ) : (
        <input
          id={nome}
          className="form-control"
          type={tipo}
          value={value}
          onChange={onChange}
          placeholder={nome}
          required
          {...(tipo === "number" ? { min: "1" } : {})}
        />
      )}
    </div>
  );
}

export default Campo;
