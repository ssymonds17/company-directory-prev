import React, { useState } from 'react';

export default function AddButton(props) {
  const { type, addRecord, onSelectClick, thisSelected, flex, open } = props;
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div className='add-button-container'>
        <p
          className='select-explain'
          style={hovered ? { display: 'block' } : { display: 'none' }}
        >
          Click select to activate filter and choose desired {type} to filter
          employees
        </p>
        {!thisSelected && flex && (
          <button
            onClick={() => {
              onSelectClick();
              setHovered(false);
            }}
            className='select-button'
            disabled={!open}
            onMouseEnter={() => {
              setHovered(true);
            }}
            onMouseLeave={() => setHovered(false)}
          >
            select
          </button>
        )}
        {thisSelected && flex && (
          <button
            onClick={onSelectClick}
            className='select-button button-selected'
          >
            cancel
          </button>
        )}
        <h3 onClick={addRecord} className='add-button'>
          +
        </h3>
      </div>
    </>
  );
}
