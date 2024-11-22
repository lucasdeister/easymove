import "./TableHeader.module.scss"

interface TableHeaderProps{
  columns: string[];
}
const TableHeader = ({ columns }: TableHeaderProps) => {
  return (
    <thead>
      <tr>
        {columns.map((coluna: string, index: number) => (
          <th key={index}>{coluna}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;