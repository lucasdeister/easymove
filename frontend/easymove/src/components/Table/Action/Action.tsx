import "./Action.module.scss";

import { useModalContext } from "../../../context/ModalContext";

interface ActionProps {
    id: number;
}

const Action = ({ id }: ActionProps) => {

    const { setIdMotoristaSelecionado, idMotoristaSelecionado } = useModalContext();

    const selecionarMotorista = (id: number) => {
        setIdMotoristaSelecionado(id);
    };

    return (

        <div className="btn-group" role="group" aria-label="Checkbox toggle buttons">
            <input
                type="radio"
                className="btn-check"
                id={`btn_check_${id}`}
                autoComplete="off"
                name="motorista-selecao"
                onChange={() => selecionarMotorista(id)}
                checked={idMotoristaSelecionado === id}
            />
            <label id={`label_escolher_${id}`} className="btn btn-outline-primary" htmlFor={`btn_check_${id}`}>
                Escolher
            </label>
        </div>
    );
};

export default Action;
