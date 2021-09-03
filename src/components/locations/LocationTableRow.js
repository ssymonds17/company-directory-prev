import React, { useState } from 'react';
import '../../index.css';

export default function LocationTableRow({
  location,
  handleClick,
  isSelected
}) {
  const { id, name } = location;
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <tr key={id}>
        <td
          className={isClicked ? 'selected-category' : ''}
          onClick={() => {
            handleClick(location);
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
