import "./ActionSelecionar.module.scss";

import { useModalContext } from "../../../../context/ModalContext";

interface ActionSelecionarProps {
    id: number;
}

const ActionSelecionar = ({ id }: ActionSelecionarProps) => {

    const { setIdMotoristaSelecionado, idMotoristaSelecionado } = useModalContext();

    const selecionarMotorista = (id: number) => {
        setIdMotoristaSelecionado(id);
    };

    return (

        <div className="btn-group" role="group" aria-label="Checkbox toggle buttons">

            <label
                onClick={() => selecionarMotorista(id)} 
                id={`label_escolher_${id}`}
                className="btn btn-outline-primary"
                htmlFor={`btn_check_${id}`}>Escolher
                    <input
                        type="radio"
                        className="ms-2"
                        id={`btn_check_${id}`}
                        autoComplete="off"
                        name="motorista-selecao"
                        onChange={() => selecionarMotorista(id)}
                        checked={idMotoristaSelecionado === id}
                    />
            </label>
        </div>
    );
};

export default ActionSelecionar;