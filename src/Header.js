import './header.css'
import React from 'react';

function Header() {
  return (
    <>
    <div style={{backgroundColor:'black'}}>
      <div className="nav_bar">
        <h2 style={{fontFamily:'Ariel'}}>Shopping Cart</h2>
        <div className='nav_child'>
          <p>Home</p>
          <p>About</p>
        </div>
      </div>
      <hr style={{ borderColor: 'yellow', margin:'0' }}></hr>
      </div>
    </>
  );
}

export default Header;