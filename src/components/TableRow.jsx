import React, { useState } from "react";

const updateChildValues = (row, newValue) => {
  const ratio = newValue / row.value;
  row.value = newValue;
  if (row.children) {
    row.children.forEach((child) =>
      updateChildValues(child, child.value * ratio)
    );
  }
};

const recalculateParentValue = (parentRow) => {
  if (parentRow.children) {
    parentRow.value = parentRow.children.reduce(
      (sum, child) => sum + child.value,
      0
    );
  }
};

const TableRow = ({ row, rows, setRows, parent = null, level = 0 }) => {
  const [variance, setVariance] = useState(0);
  const [input, setInput] = useState("");

  const handleAllocationPercentage = () => {
    const percent = parseFloat(input);
    if (!isNaN(percent)) {
      const newValue = row.value + (row.value * percent) / 100;
      updateValue(newValue);
    }
    setInput("");
  };

  const handleAllocationValue = () => {
    const newValue = parseFloat(input);
    if (!isNaN(newValue)) {
      updateValue(newValue);
    }
    setInput("");
  };

  const updateValue = (newValue) => {
    const originalValue = row.value;

    row.value = newValue;

    if (parent) recalculateParentValue(parent);

    if (row.children) {
      const ratio = newValue / originalValue;
      row.children.forEach((child) => {
        child.value = child.value * ratio;
      });
    }

    setVariance(((newValue - originalValue) / originalValue) * 100);

    setRows([...rows]);
  };

  return (
    <>
      <tr>
        <td style={{ paddingLeft: `${level * 20}px` }}>{!row.children ? "--": ""}{row.label}</td>
        <td>{row.value}</td>
        <td>
          <input
            style={{
              border: "none",
              borderRadius: "4px",
              background: "transparent",
              padding: "10px",
            }}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="value or % for allocation"
            required
          />
        </td>
        <td>
          <button onClick={handleAllocationPercentage}>Allocation %</button>
        </td>
        <td>
          <button onClick={handleAllocationValue}>Allocation Val</button>
        </td>
        <td>{variance.toFixed(2)}%</td>
      </tr>
      {row.children &&
        row.children.map((child) => (
          <TableRow
            key={child.id}
            row={child}
            rows={rows}
            setRows={setRows}
            parent={row}
            level={level + 1}
          />
        ))}
    </>
  );
};

export default TableRow;
