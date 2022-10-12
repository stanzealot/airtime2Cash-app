import './table.scss'
import { useTable } from "react-table";

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data,
  });
  return (
    <table className="table" {...getTableProps()}>
      <thead className="table_header">
        {headerGroups.map(headerGroup => (
          <tr className="table_row"
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map(column => (
              <th
                className="table_heading"
                {...column.getHeaderProps()}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="tbody" {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr className='tbody_row' {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    className="tbody_cell"
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  );
};

export default Table;