import React, { useState } from 'react';
import '../../index.css';

export default function DepartmentTableRow({
  department,
  handleClick,
  isSelected
}) {
  const { id, name } = department;
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <tr key={id}>
        <td
          className={isClicked ? 'selected-category' : ''}
          onClick={() => {
            handleClick(department);
            if (isSelected) {
              isClicked ? setIsClicked(false) : setIsClicked(true);
            }
          }}
        >
          {name}
        </td>
      </tr>
    </>
  );
}
