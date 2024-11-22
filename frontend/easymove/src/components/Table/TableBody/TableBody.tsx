interface TableBodyProps<T> {
  data: T[];
  renderRow: (item: T) => React.ReactNode;
}

const TableBody = <T,>({ data, renderRow }: TableBodyProps<T>) => (
  <tbody>
    {data.map((item, index) => (
      <tr key={index}>{renderRow(item)}</tr>
    ))}
  </tbody>
);

export default TableBody;