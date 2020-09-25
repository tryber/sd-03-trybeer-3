import React from 'react';
import SideMenuAdmin from '../components/SideMenuAdmin';

function AdminOrders() {

  return (
    <div>
      <h1 data-testid="top-title">Trybeer</h1>
      {SideMenuAdmin()}
    </div>
  );
}

export default AdminOrders;