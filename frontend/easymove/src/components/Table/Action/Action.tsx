import "./Action.module.scss"

interface ActionProps {
    id: number;
}

const Action = ({ id }: ActionProps) => {

    return (
        <div className="btn-group" role="group" aria-label="Checkbox toggle buttons">
            <input
                type="radio"
                className="btn-check"
                id={`btn_check_${id}`}
                autoComplete="off"
                name="motorista-selecao"
            />
            <label className="btn btn-outline-primary" htmlFor={`btn_check_${id}`}>
                Escolher
            </label>
        </div>
    );
};

export default Action;