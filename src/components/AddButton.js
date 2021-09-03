import React from 'react';

export default function AddButton(props) {
  const { addRecord } = props;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <h3 onClick={addRecord} style={{ paddingRight: '0.5rem' }}>
          +
        </h3>
      </div>
    </>
  );
}
