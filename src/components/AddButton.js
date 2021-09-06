import React from 'react';

export default function AddButton(props) {
  const { addRecord, onSelectClick, thisSelected, flex, open } = props;

  return (
    <>
      <div className='add-button-container'>
        {!thisSelected && flex && (
          <button
            onClick={onSelectClick}
            className='select-button'
            disabled={!open}
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
