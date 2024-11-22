import Action from '../Action/Action';
import Motorista from "../../types/IMotorista"

interface TableRowProps {
  rowData: Motorista;
  isMobile: boolean;
}

const TableRow = ({ rowData }: TableRowProps) => {

  return (
    <tr>
      {/* {!isMobile && <td>{rowData.nome_motorista}</td>} */}
        <td>{rowData.nome}</td>
        <td>{rowData.descricao}</td>
        <td>{rowData.carro}</td>
        <td>{rowData.rating}</td>
        <td>{rowData.km_minimo}</td>
        <td>{rowData.taxa_km}</td>
        <td>
          <Action id={rowData.id}/>
        </td>
    </tr>
);
};

export default TableRow;