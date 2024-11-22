import "./Action.module.scss"
import { useEffect, useState } from 'react';

interface ActionProps {
    id: number;
}


const Action = ({ id } : ActionProps) => {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1000);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="dropdown">
            <button
                className="btn btn-outline-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false">{isMobile ? <i className="bi bi-list"></i> : 'Selecione'}
            </button>
        </div>
    );
};

export default Action;