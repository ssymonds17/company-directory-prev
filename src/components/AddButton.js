import React from 'react';

export default function AddButton(props) {
  const { addRecord, onSelectClick, thisSelected, flex } = props;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {!thisSelected && (
          <h3 onClick={onSelectClick} style={{ paddingRight: '0.5rem' }}>
            {flex ? 'select' : ''}
          </h3>
        )}
        {thisSelected && (
          <h3
            onClick={onSelectClick}
            style={{ paddingRight: '0.5rem', color: 'red' }}
          >
            {flex ? 'select' : ''}
          </h3>
        )}
        <h3 onClick={addRecord} style={{ paddingRight: '0.5rem' }}>
          +
        </h3>
      </div>
    </>
  );
}
