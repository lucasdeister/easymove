import "./ActionAvaliar.module.scss";

interface ActionAvaliarProps {
    id: number;
    isMobile: boolean;
}

const ActionAvaliar = ({ id, isMobile }: ActionAvaliarProps) => {

    const avaliarCorrida = (id: number) => {
        console.log(id);
    };

    return (
        <>
            <input
                type="button"
                id={`btn_avaliar_${id}`}
                autoComplete="off"
                name="historico-avaliação"
                onChange={() => avaliarCorrida(id)}
            />
            <label
                id={`label_avaliar_${id}`}
                className="btn btn-outline-primary"
                htmlFor={`btn_avaliar_${id}`}>
                    {isMobile ? <i className="bi bi-star"></i> : 'Avaliar'}
            </label>
        </>
    );
};

export default ActionAvaliar;
