import { useEffect } from "react";
import { useModalContext } from "../../../../context/ModalContext";
import { useCronometroContext } from "../../../../context/CronometroContext";
import { useUtilContext } from "../../../../context/UtilContext";

interface ItemActionProps {
    nome: string;
    nome_icone: string;
    id: number;
    tempo_restante: string;
    tempo_decorrido: string;
}

function ItemAction({ nome, nome_icone, id, tempo_restante, tempo_decorrido }: ItemActionProps) {

    const { setCampoNome, setCampoPrazo, setCampoObservacoes,
        setCampoNomeDisabled, setCampoDuracaoDisabled, setCampoPrazoDisabled,
        habilitarCamposForm, setDescricaoModalApagar, setModalState, setModalNome,
        setCampoInicioDisabled, setCampoInicio, setCampoDuracaoHoras, setCampoDuracaoMinutos
    } = useModalContext();


    const { setTempoRestante, preencherTempoRestante, setCronometroAtivo, setTempoDecorrido,
         preencherTempoDecorrido, setBotaoExecutarDesativado, botaoExecutarDesativado
        } = useCronometroContext();

    const { tarefaEmExecucao, setTarefaEmExecucao, arrayTarefas,
        obterIdCorrespondente, setIdTarefaSelecionada, obterDiaAtual, setTarefaExecutando
    } = useUtilContext();

    const idTarefaArray = obterIdCorrespondente(id);

    const exibirModalEdicao = (): void => {
        setIdTarefaSelecionada(id);
        const tarefaIniciada = arrayTarefas[idTarefaArray].status !== "A fazer";

        if (tarefaIniciada) {
            desabilitarCamposTarefasIniciadas(idTarefaArray);
        } else {
            habilitarCamposForm();
        }
        const tarefaEmProgresso = (arrayTarefas[idTarefaArray].status === "Executando"
            || arrayTarefas[idTarefaArray].status === "Pausada");

        if (tarefaEmProgresso) {
            setCampoPrazoDisabled(false);
        }

        preencherInformacoesTarefa(idTarefaArray);

        setModalNome("Editar");
        setModalState(true);

    }

    function obterHoraMinuto(duracao: string) {
        const [horas, minutos] = duracao.split(':').map(Number);
        return [horas, minutos];
      }

    const preencherInformacoesTarefa = (idTarefaArray : number): void => {
        setCampoNome(arrayTarefas[idTarefaArray].nome)
        setCampoDuracaoHoras(obterHoraMinuto(arrayTarefas[idTarefaArray].duracao)[0])
        setCampoDuracaoMinutos(obterHoraMinuto(arrayTarefas[idTarefaArray].duracao)[1])
        setCampoPrazo(arrayTarefas[idTarefaArray].prazo)
        setCampoInicio(arrayTarefas[idTarefaArray].inicio)
        setCampoObservacoes(arrayTarefas[idTarefaArray].observacoes)
    }

    const desabilitarCampoNome = (): void => {
        setCampoNomeDisabled(true);
    }

    const desabilitarCampoDuracao = (): void => {
        setCampoDuracaoDisabled(true);
    }

    const desabilitarCampoPrazo = (): void => {
        setCampoPrazoDisabled(true);
    }

    const desabilitarCampoInicio = (): void => {
        setCampoInicioDisabled(true);
    }


    const desabilitarCamposTarefasIniciadas = (idTarefaArray: number): void => {

        desabilitarCampoNome();
        desabilitarCampoDuracao();
        desabilitarCampoInicio();

        const tarefaEncerrada = (arrayTarefas[idTarefaArray].status === "Concluída"
            || arrayTarefas[idTarefaArray].status === "Cancelada");

        if (tarefaEncerrada) {
            desabilitarCampoPrazo();
        }
    }

    const exibirModalApagarTarefa = (): void => {
        setModalNome("Apagar");
        setModalState(true);
        setDescricaoModalApagar("da tarefa?");
        setIdTarefaSelecionada(id);
    }
    
    const colocarTarefaEmExecucao = (id: number): void =>{
        arrayTarefas[id].status = "Executando";
        arrayTarefas[id].data_execucao = obterDiaAtual();
        localStorage.setItem('tarefas', JSON.stringify(arrayTarefas));
      }
    
  

    useEffect(() => {
        if(tarefaEmExecucao){
            setBotaoExecutarDesativado(true);
        }else{
            setBotaoExecutarDesativado(false);
        }
    }, [tarefaEmExecucao, setBotaoExecutarDesativado]);

    const executarTarefa = (id: number): void => {
        preencherTempoDecorrido(tempo_decorrido);
        preencherTempoRestante(tempo_restante);
        setCronometroAtivo(true);
        setTarefaEmExecucao(true);
        colocarTarefaEmExecucao(id);
    }

    const pausarTarefa = (id: number): void => {
        setCronometroAtivo(false);
        setTarefaEmExecucao(false);
        setTarefaExecutando(undefined);
        setBotaoExecutarDesativado(false);
        arrayTarefas[id].status = "Pausada";
        localStorage.setItem('tarefas', JSON.stringify(arrayTarefas));
        
    }

    const concluirTarefa = (id: number): void => {
        setCronometroAtivo(false);
        setTarefaEmExecucao(false);
        setTarefaExecutando(undefined);
        arrayTarefas[id].status = "Concluída";
        arrayTarefas[id].tempo_restante = "00:00:00";
        localStorage.setItem('tarefas', JSON.stringify(arrayTarefas));
        setTempoRestante(0);
        setTempoDecorrido(0);
    }

    const cancelarTarefa = (id: number): void => {
        setCronometroAtivo(false);
        setTarefaEmExecucao(false);
        setTarefaExecutando(undefined);
        arrayTarefas[id].status = "Cancelada";
        arrayTarefas[id].tempo_restante = "00:00:00";
        localStorage.setItem('tarefas', JSON.stringify(arrayTarefas));
        setTempoRestante(0);
        setTempoDecorrido(0);
    }

    const executarOpcao = (): void => {
        const itemIndex = obterIdCorrespondente(id);
        switch (nome) {
            case "Executar":
                executarTarefa(itemIndex);
                break;
            case "Editar":
                exibirModalEdicao();
                break;
            case "Apagar":
                exibirModalApagarTarefa();
                break;
            case "Pausar":
                pausarTarefa(itemIndex);
                break;
            case "Concluir":
                concluirTarefa(itemIndex);
                break;
            case "Cancelar":
                cancelarTarefa(itemIndex);
                break;
        }
    }

    return (
        <div>
            <li >
                <button
                    className="dropdown-item"
                    onClick={executarOpcao}
                    disabled={nome === 'Executar' && botaoExecutarDesativado}>
                    <i className={`bi bi-${nome_icone} me-2`}></i>
                    {nome}
                </button>
            </li>
        </div>
    )
}


export default ItemAction;