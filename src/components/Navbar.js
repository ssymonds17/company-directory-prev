import React from 'react';
import { useGlobalContext } from '../context';

export default function Navbar() {
  const { setUserInput } = useGlobalContext();
  return (
    <div id='navbar'>
      <h1>Company Directory</h1>
      <input
        type='text'
        placeholder='Employee Search'
        autoComplete='off'
        onChange={(e) => setUserInput(e.target.value)}
      />
    </div>
  );
}
