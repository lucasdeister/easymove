import TableHeader from "./TableHeader/TableHeader";
import TableBody from "./TableBody/TableBody";
import "./Table.module.scss";

interface TableProps<T> {
  columns: string[];
  data: T[];
  renderRow: (item: T) => React.ReactNode;
}

const Table = <T,>({ columns, data, renderRow }: TableProps<T>): JSX.Element => {
  return (
    <table className="table table-striped table-hover align-middle text-center table-responsive">
      <TableHeader columns={columns} />
      <TableBody data={data} renderRow={renderRow} />
    </table>
  );
};

export default Table;
