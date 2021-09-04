import React from 'react';

export default function AddButton(props) {
  const { addRecord, onSelectClick, thisSelected, flex, open } = props;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {!thisSelected && flex && (
          <button
            onClick={onSelectClick}
            style={{ paddingRight: '0.5rem' }}
            disabled={!open}
          >
            select
          </button>
        )}
        {thisSelected && flex && (
          <button
            onClick={onSelectClick}
            style={{ paddingRight: '0.5rem', color: 'red' }}
          >
            cancel
          </button>
        )}
        <h3 onClick={addRecord} style={{ paddingRight: '0.5rem' }}>
          +
        </h3>
      </div>
    </>
  );
}
