import React from "react";
import TableRow from "./TableRow";

const calculateGrandTotal = (rows) =>
  rows.reduce((total, row) => total + row.value, 0);

const Table = ({ rows, setRows }) => {
  const grandTotal = calculateGrandTotal(rows);
  return (
    <div>
      <table border="1" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocation (%) </th>
            <th>Allocation Val </th>
            <th>Variance (%)</th>
          </tr>
        </thead>
        <tbody>
            {/* {console.log(rows)} */}
          {rows.map((row) => (
            <TableRow key={row.id} row={row} rows={rows} setRows={setRows} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
