import "./Action.module.scss"
import { useEffect, useState } from 'react';

interface ActionProps {
    id: number;
}


const Action = ({ id }: ActionProps) => {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1000);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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